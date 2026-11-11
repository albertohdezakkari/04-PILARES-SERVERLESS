const phases = [...document.querySelectorAll('.phase')];
const phaseButtons = [...document.querySelectorAll('[data-phase]')];
const content = document.querySelector('#course-content');
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
  content.scrollTop = 0;
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
  const blocks = document.createElement('nav');
  blocks.className = 'yaml-blocks actions';
  blocks.setAttribute('aria-label', 'Bloques del YAML');
  const outcome = document.createElement('p');
  outcome.className = 'yaml-outcome';
  outcome.setAttribute('role', 'status');
  const tabs = sections.map((section, index) => button(section.dataset.label, () => render(index)));
  blocks.append(...tabs);
  const header = document.createElement('div');
  header.className = 'yaml-reader-header';
  header.append(blocks, outcome);
  toolbar.replaceWith(header);
  pre.after(notes);

  function render(page) {
    const section = sections[page];
    sections.forEach((item, index) => { item.hidden = index !== page; });
    tabs.forEach((tab, index) => tab.setAttribute('aria-pressed', String(index === page)));
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
      if (!term) {
        code.append(line);
        continue;
      }
      const lineButton = button(line, () => {
        select(term, lineButton);
        if (matchMedia('(max-width: 799px)').matches) {
          term.scrollIntoView({block: 'nearest'});
        }
      });
      lineButton.className = 'yaml-line';
      lineButton.setAttribute('aria-label', 'Explicar ' + text);
      interactiveLines.push({lineButton, term});
      code.append(lineButton);
    }
    function select(term, activeButton) {
      definitions.forEach(item => { item.hidden = item !== term; });
      interactiveLines.forEach(({lineButton}) =>
        lineButton.setAttribute('aria-pressed', String(lineButton === activeButton)));
    }
    select(definitions[0], interactiveLines[0]?.lineButton);
    pre.scrollTop = 0;
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
  toolbar.append(copyButton(fileName ? 'Copiar archivo completo' : 'Copiar comando', fullText,
    fileName ? 'Pulsa Ver archivo entero para copiarlo manualmente.' : 'Selecciona el texto y cópialo con el teclado.'));
  if (fileName) {
    const lines = fullText.split('\n');
    const pageSize = 17;
    const count = Math.ceil(lines.length / pageSize);
    const pageLabel = document.createElement('span');
    let page = 0;
    let full = false;
    const previous = button('Página anterior', () => { page--; render(); });
    const following = button('Página siguiente', () => { page++; render(); });
    const toggle = button('Ver archivo entero', () => { full = !full; render(); });
    function render() {
      const visibleLines = full ? lines : lines.slice(page * pageSize, (page + 1) * pageSize);
      const focus = fileName === 'serverless.yml'
        ? /^\s*(service:|region:|role:|Ref:|payload:|handler:|method:|KeyType:|Outputs:)/
        : /process\.env|async function (getPass|register|checkIn|handler)/;
      code.replaceChildren();
      for (const [index, line] of visibleLines.entries()) {
        if (index > 0) code.append('\n');
        if (focus.test(line)) {
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
      pre.scrollTop = 0;
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

const commands = '#conexion .guide-step:not(#pegar-aws) pre, #datos pre, #lectura pre[data-command], #conectar-api pre, #inscripcion pre, #entrada pre, #prueba pre';
for (const pre of document.querySelectorAll(commands)) addCodeControls(pre);
showRoute();
