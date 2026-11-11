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

for (const control of document.querySelectorAll('[data-os]')) {
  control.addEventListener('click', () => {
    const os = control.dataset.os;
    for (const choice of document.querySelectorAll('[data-os]')) {
      choice.setAttribute('aria-pressed', String(choice.dataset.os === os));
    }
    for (const panel of document.querySelectorAll('[data-os-panel]')) {
      panel.hidden = panel.dataset.osPanel !== os;
    }
  });
}

function addCodeControls(pre) {
  pre.tabIndex = 0;
  const code = pre.querySelector('code');
  const fullText = code.textContent;
  const toolbar = document.createElement('div');
  toolbar.className = 'code-toolbar actions';
  const feedback = document.createElement('span');
  feedback.setAttribute('role', 'status');
  const isFile = pre.closest('#archivo-lambda, #infraestructura');
  const copy = button(isFile ? 'Copiar archivo completo' : 'Copiar comando', async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      feedback.textContent = 'Copiado.';
    } catch {
      feedback.textContent = 'Selecciona el texto y cópialo con el teclado.';
    }
  });
  toolbar.append(copy);
  pre.before(toolbar);
  if (isFile) {
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
      const focus = pre.closest('#infraestructura')
        ? /^\s*(EVENTS_TABLE:|REGISTRATIONS_TABLE:|Ref:|handler:|method:|KeyType:)/
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

const commands = '#conexion .guide-step:not(#pegar-aws) pre, #datos pre, #conectar-api pre, #construir-post pre, #construir-patch pre';
for (const pre of document.querySelectorAll(commands)) addCodeControls(pre);
showRoute();
