const tabs = [...document.querySelectorAll('[role="tab"]')];
const status = document.querySelector('.status');
const deepLinks = document.querySelector('[data-deep-link]');

function tabFromHash() {
  return tabs.find(tab => '#' + tab.getAttribute('aria-controls') === location.hash);
}

function showPanel(selected) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

function selectTab(tab) {
  showPanel(tab);
  if (deepLinks) history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
}

if (deepLinks) {
  showPanel(tabFromHash() ?? tabs[0]);
  window.addEventListener('hashchange', () => {
    const tab = tabFromHash();
    if (tab) showPanel(tab);
  });
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    tabs[next].focus();
    selectTab(tabs[next]);
  });
}

for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code');
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = 'Copiado';
      status.textContent = 'Contenido copiado.';
    } catch {
      code.closest('pre').focus();
      status.textContent = 'Selecciona el contenido y cópialo con el teclado.';
    }
  });
}

document.getElementById('print')?.addEventListener('click', () => window.print());
