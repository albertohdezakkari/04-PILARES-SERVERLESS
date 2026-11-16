const tabs = [...document.querySelectorAll('[role="tab"]')];
const status = document.querySelector('.status');

function showPanel(selected) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', () => showPanel(tab));
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
    showPanel(tabs[next]);
  });
}

for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code');
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = 'Copiado';
      status.textContent = 'Comando copiado.';
    } catch {
      code.closest('pre').focus();
      status.textContent = 'Selecciona el comando y cópialo con el teclado.';
    }
  });
}

document.getElementById('print').addEventListener('click', () => window.print());
