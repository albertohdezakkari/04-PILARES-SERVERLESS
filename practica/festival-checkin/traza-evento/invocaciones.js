const section = document.querySelector('#invocaciones');
const tabs = section.querySelector('[role="tablist"]');
const status = section.querySelector('[role="status"]');
const panels = section.querySelector('.invoke-panels');

async function cargarInvocaciones() {
  const response = await fetch(new URL('../index.html', import.meta.url));
  if (!response.ok) throw new Error('No se pudo abrir el cuaderno.');

  const workbook = new DOMParser().parseFromString(await response.text(), 'text/html');
  const actions = [...workbook.querySelectorAll('#invocaciones > article')];
  if (!actions.length) throw new Error('El cuaderno no contiene las invocaciones.');

  function seleccionar(index) {
    for (const [position, action] of actions.entries()) {
      const selected = position === index;
      const tab = tabs.children[position];
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      action.hidden = !selected;
    }
    status.textContent = '';
  }

  for (const [index, action] of actions.entries()) {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.id = 'tab-' + action.id;
    tab.textContent = action.dataset.step;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', action.id);
    tab.addEventListener('click', () => {
      seleccionar(index);
      history.replaceState(null, '', '#' + action.id);
    });
    tabs.append(tab);

    action.setAttribute('role', 'tabpanel');
    action.setAttribute('aria-labelledby', tab.id);
    const pre = action.querySelector('pre');
    pre.tabIndex = 0;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'invoke-copy';
    copy.textContent = 'Copiar comando';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code').textContent);
        status.textContent = 'Comando copiado.';
      } catch {
        status.textContent = 'Selecciona el comando y cópialo con el teclado.';
      }
    });
    pre.before(copy);
    panels.append(action);
  }

  tabs.addEventListener('keydown', event => {
    const index = [...tabs.children].indexOf(event.target);
    const next = {
      ArrowRight: (index + 1) % actions.length,
      ArrowLeft: (index + actions.length - 1) % actions.length,
      Home: 0,
      End: actions.length - 1
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    tabs.children[next].click();
    tabs.children[next].focus();
  });

  function abrirDesdeEnlace() {
    const hash = location.hash.slice(1);
    const index = actions.findIndex(action => action.id === hash);
    if (index < 0) return;
    seleccionar(index);
    section.scrollIntoView();
  }

  seleccionar(0);
  abrirDesdeEnlace();
  tabs.hidden = false;
  window.addEventListener('hashchange', abrirDesdeEnlace);
}

cargarInvocaciones().catch(() => {
  status.textContent = 'No se han podido cargar las pestañas.';
  section.querySelector('.invoke-fallback').hidden = false;
});
