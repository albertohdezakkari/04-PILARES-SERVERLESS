const phases = [...document.querySelectorAll('.phase')];
const phaseButtons = [...document.querySelectorAll('[data-phase]')];
const progress = document.querySelector('#guide-progress');
const tabs = document.querySelector('#guide-steps');
const back = document.querySelector('#guide-back');
const next = document.querySelector('#guide-next');
const steps = [...document.querySelectorAll('.guide-step')];
const courseSteps = steps.filter(step => step.closest('.phase').id !== 'referencias');
let activeStep = courseSteps[0];
let lastCourseStep = activeStep;

function button(label, handler) {
  const node = document.createElement('button');
  node.type = 'button';
  node.textContent = label;
  node.addEventListener('click', handler);
  return node;
}

function navigate(id) {
  if (location.hash === '#' + id) return;
  location.hash = id;
}

const previousSteps = new Map([
  ['crear-eventos', 'infraestructura'],
  ['crear-inscripciones', 'infraestructura'],
  ['crear-lambda', 'archivo-lambda'],
  ['tablas-lambda', 'infraestructura'],
  ['consola-alternativa', 'infografia-terminal']
]);

function showRoute() {
  const hash = location.hash.slice(1);
  const target = document.getElementById(previousSteps.get(hash) ?? hash) ?? courseSteps[0];
  const phase = target.closest('.phase') ?? courseSteps[0].closest('.phase');
  const phaseSteps = [...phase.querySelectorAll('.guide-step')];
  activeStep = target.closest('.guide-step') ?? phaseSteps[0];
  if (courseSteps.includes(activeStep)) lastCourseStep = activeStep;

  for (const section of phases) section.hidden = section !== phase;
  for (const step of steps) step.hidden = step !== activeStep;
  for (const control of phaseButtons) {
    control.setAttribute('aria-pressed', String(control.dataset.phase === phase.id));
  }

  const title = phase.querySelector('h2').textContent;
  const index = phaseSteps.indexOf(activeStep);
  progress.textContent = index < 0 ? 'Pantalla de prueba'
    : title + ' · Paso ' + (index + 1) + ' de ' + phaseSteps.length;
  tabs.replaceChildren(...phaseSteps.map(step => {
    const tab = button(step.dataset.step, () => navigate(step.id));
    tab.setAttribute('aria-pressed', String(step === activeStep));
    return tab;
  }));
  tabs.hidden = phaseSteps.length < 2;
  tabs.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });

  const courseIndex = courseSteps.indexOf(activeStep);
  back.textContent = courseIndex < 0 ? '← Volver al paso' : '← Atrás';
  back.disabled = courseIndex === 0;
  next.hidden = courseIndex < 0 && (index < 0 || index === phaseSteps.length - 1);
  next.textContent = courseIndex === courseSteps.length - 1 ? 'Abrir pantalla de prueba →' : 'Siguiente →';
  window.scrollTo(0, 0);
  const heading = activeStep?.querySelector('h3') ?? phase.querySelector('h2');
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

for (const control of phaseButtons) {
  control.addEventListener('click', () => navigate(control.dataset.phase));
}
back.addEventListener('click', () => {
  const index = courseSteps.indexOf(activeStep);
  if (index !== 0) navigate((index < 0 ? lastCourseStep : courseSteps[index - 1]).id);
});
next.addEventListener('click', () => {
  const index = courseSteps.indexOf(activeStep);
  if (index >= 0) {
    navigate(courseSteps[index + 1]?.id ?? 'pantalla');
  } else {
    const sibling = activeStep?.nextElementSibling;
    if (sibling?.matches('.guide-step')) navigate(sibling.id);
  }
});
window.addEventListener('hashchange', showRoute);

function addYamlReader(pre, toolbar, lines) {
  const code = pre.querySelector('code');
  const notes = pre.parentElement.querySelector('.code-notes');
  const sections = [...notes.querySelectorAll('[data-code-start]')];
  const starts = sections.map(section => lines.findIndex(line => line.startsWith(section.dataset.codeStart)));
  const tree = pre.parentElement.querySelector('.yaml-tree');
  const nodes = [...tree.querySelectorAll('[data-yaml-block]')];
  const narrow = matchMedia('(max-width: 999px)');
  const outcome = document.createElement('p');
  outcome.className = 'yaml-outcome';
  const nodePreview = document.createElement('p');
  nodePreview.className = 'yaml-node-preview';
  const backToTree = button('↑ Volver al árbol', () => {
    const selected = tree.querySelector('[aria-pressed="true"]');
    selected.focus({preventScroll: true});
    selected.scrollIntoView({block: 'nearest'});
  });
  backToTree.className = 'yaml-back';
  notes.prepend(outcome, backToTree);
  toolbar.remove();
  pre.after(notes);

  for (const [index, node] of nodes.entries()) {
    const branch = node.nextElementSibling;
    if (branch) {
      branch.id = 'yaml-branch-' + index;
      branch.hidden = node.dataset.yamlLine !== 'provider:';
      node.setAttribute('aria-label', node.textContent);
      node.setAttribute('aria-controls', branch.id);
      node.setAttribute('aria-expanded', String(!branch.hidden));
    }
    const show = () => render(sections.findIndex(section =>
      section.dataset.label === node.dataset.yamlBlock), node);
    node.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && !narrow.matches) show();
    });
    node.addEventListener('click', () => {
      if (branch) {
        branch.hidden = !branch.hidden;
        node.setAttribute('aria-expanded', String(!branch.hidden));
      }
      show();
      if (narrow.matches) {
        const explanation = notes.querySelector(':scope > section:not([hidden]) .yaml-terms > div:not([hidden]) dd');
        nodePreview.replaceChildren(...[...explanation.childNodes].map(child => child.cloneNode(true)));
        node.after(nodePreview);
      }
    });
  }

  function render(page, node = nodes[0]) {
    const section = sections[page];
    sections.forEach((item, index) => { item.hidden = index !== page; });
    nodes.forEach(item => item.setAttribute('aria-pressed', String(item === node)));
    outcome.textContent = section.querySelector('.yaml-outcome').textContent;
    const definitions = [...section.querySelectorAll('.yaml-terms > div')];
    const interactiveLines = [];
    code.replaceChildren();
    for (const [index, line] of lines.slice(starts[page], starts[page + 1]).entries()) {
      if (index > 0) code.append('\n');
      const text = line.trimStart().replace(/^- /, '');
      const term = definitions.find(item => {
        const heading = item.querySelector('dt');
        const keys = (heading.dataset.lines ?? heading.textContent).split('|');
        return keys.some(key => key.endsWith(':') ? text.startsWith(key) : text === key);
      });
      const lineElement = term ? button('', () => {
        select(term, lineElement);
        if (narrow.matches) term.scrollIntoView({block: 'nearest'});
      }) : document.createElement('span');
      if (term) {
        lineElement.className = 'yaml-line';
        lineElement.setAttribute('aria-label', 'Explicar ' + text);
        lineElement.addEventListener('pointerenter', event => {
          if (event.pointerType === 'mouse') select(term, lineElement);
        });
        interactiveLines.push({lineButton: lineElement, term, text});
      }
      const parts = /^(\s*(?:- )?)([\w]+)(:)(.*)$/.exec(line);
      if (parts) {
        const [, indent, key, colon, value] = parts;
        const keyText = document.createElement('strong');
        keyText.className = 'yaml-key';
        keyText.textContent = key;
        const valueText = document.createElement('span');
        valueText.className = 'yaml-value';
        valueText.textContent = value;
        lineElement.append(indent, keyText, colon, valueText);
      } else {
        lineElement.textContent = line;
      }
      code.append(lineElement);
    }
    function select(term, activeButton) {
      definitions.forEach(item => { item.hidden = item !== term; });
      interactiveLines.forEach(({lineButton}) =>
        lineButton.setAttribute('aria-pressed', String(lineButton === activeButton)));
    }
    const selected = interactiveLines.find(item => item.text.startsWith(node.dataset.yamlLine))
      ?? interactiveLines[0];
    select(selected.term, selected.lineButton);
    pre.scrollLeft = 0;
  }
  render(0);
}

function addCodeControls(pre) {
  pre.tabIndex = 0;
  const code = pre.querySelector('code');
  const fullText = code.textContent;
  const reading = pre.hasAttribute('data-reading');
  const toolbar = document.createElement('div');
  toolbar.className = 'code-toolbar actions';
  const feedback = document.createElement('span');
  feedback.setAttribute('role', 'status');
  const fileName = pre.dataset.file;
  function copyButton(label, value, fallback) {
    return button(label, async () => {
      try {
        await navigator.clipboard.writeText(value);
        feedback.textContent = 'Copiado.';
      } catch {
        feedback.textContent = fallback;
      }
    });
  }
  pre.before(toolbar);
  if (reading) {
    addYamlReader(pre, toolbar, fullText.split('\n'));
    return;
  }
  toolbar.append(copyButton(fileName ? 'Copiar archivo completo' : pre.hasAttribute('data-example') ? 'Copiar código' : 'Copiar comando', fullText,
    fileName ? 'Pulsa Ver archivo entero para copiarlo manualmente.' : 'Selecciona el texto y cópialo con el teclado.'));
  if (fileName) {
    const lines = fullText.split('\n');
    const indexNote = pre.parentElement.querySelector('.index-note');
    if (indexNote) indexNote.before(toolbar);
    const explanations = indexNote
      ? [...document.querySelector('#index-explanations').content.children]
      : [];
    const starts = Array.from({length: Math.ceil(lines.length / 17)}, (_, index) => index * 17);
    const count = starts.length;
    const pageLabel = document.createElement('span');
    let page = 0;
    let full = false;
    const previous = button('Página anterior', () => { page--; render(); });
    const following = button('Página siguiente', () => { page++; render(); });
    const toggle = button('Ver archivo entero', () => { full = !full; render(); });
    function render() {
      const visibleLines = full ? lines : lines.slice(starts[page], starts[page + 1]);
      const focus = fileName === 'serverless.yml'
        ? /^\s*(service:|region:|role:|Ref:|payload:|handler:|method:|KeyType:|Outputs:)/
        : /process\.env|async function (getPass|register|checkIn|handler)/;
      code.replaceChildren();
      const lineChoices = [];
      function explain(choice, note) {
        for (const item of lineChoices) item.setAttribute('aria-pressed', String(item === choice));
        indexNote.replaceChildren(...[...note.childNodes].map(child => child.cloneNode(true)));
      }
      for (const [index, line] of visibleLines.entries()) {
        if (index > 0) code.append('\n');
        const note = explanations.find(item => line.trimStart().startsWith(item.dataset.prefix));
        if (note) {
          const choice = button(line, () => {
            explain(choice, note);
            if (matchMedia('(max-width: 899px)').matches) indexNote.scrollIntoView({block: 'nearest'});
          });
          choice.className = 'yaml-line index-line';
          choice.addEventListener('pointerenter', event => {
            if (event.pointerType === 'mouse') explain(choice, note);
          });
          choice.addEventListener('focus', () => explain(choice, note));
          lineChoices.push(choice);
          code.append(choice);
          if (lineChoices.length === 1) explain(choice, note);
        } else if (focus.test(line)) {
          const marked = document.createElement('span');
          marked.className = 'code-focus';
          marked.textContent = line;
          code.append(marked);
        } else {
          code.append(line);
        }
      }
      pageLabel.textContent = full ? 'Archivo completo' : 'Página ' + (page + 1) + ' de ' + count;
      previous.hidden = following.hidden = full;
      previous.disabled = page === 0;
      following.disabled = page === count - 1;
      toggle.textContent = full ? 'Volver a páginas' : 'Ver archivo entero';
      pre.scrollLeft = 0;
    }
    toolbar.append(toggle, previous, following, pageLabel);
    render();
  }
  toolbar.append(feedback);
}

for (const pre of document.querySelectorAll('pre[data-copy-from]')) {
  const source = document.getElementById(pre.dataset.copyFrom).querySelector('pre[data-file] code');
  pre.querySelector('code').textContent = source.textContent;
}

for (const question of document.querySelectorAll('.yaml-question')) {
  const choices = [...question.querySelectorAll('[data-feedback]')];
  const result = question.querySelector('.yaml-feedback');
  for (const choice of choices) {
    choice.addEventListener('click', () => {
      for (const option of choices) option.setAttribute('aria-pressed', String(option === choice));
      result.textContent = choice.dataset.feedback;
    });
  }
}

for (const explainer of document.querySelectorAll('[data-explainer]')) {
  const choices = [...explainer.querySelectorAll('[data-explain]')];
  const explanations = explainer.querySelectorAll('[data-explanation]');
  for (const choice of choices) {
    const reveal = () => {
      for (const option of choices) option.setAttribute('aria-pressed', String(option === choice));
      for (const explanation of explanations) explanation.hidden = explanation.id !== choice.dataset.explain;
    };
    choice.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') reveal();
    });
    choice.addEventListener('focus', reveal);
    choice.addEventListener('click', reveal);
  }
}

const accessButtons = [...document.querySelectorAll('[data-access]')];
const accessPanels = document.querySelectorAll('[data-access-panel]');
for (const choice of accessButtons) {
  choice.addEventListener('click', () => {
    for (const item of accessButtons) item.setAttribute('aria-pressed', String(item === choice));
    for (const panel of accessPanels) panel.hidden = panel.dataset.accessPanel !== choice.dataset.access;
  });
}

const commands = '#conexion .guide-step:not(#pegar-aws) pre, #infra pre, #datos pre, #lectura pre[data-command], #lectura pre[data-example], #conectar-api pre, #inscripcion pre, #entrada pre, #prueba pre';
for (const pre of document.querySelectorAll(commands)) addCodeControls(pre);
showRoute();
