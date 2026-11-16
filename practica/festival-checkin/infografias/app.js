const status = document.querySelector('.status');

for (const button of document.querySelectorAll('.copy')) {
  button.addEventListener('click', async () => {
    const command = button.closest('.command').querySelector('code');
    try {
      await navigator.clipboard.writeText(command.textContent);
      button.textContent = 'Copiado';
      status.textContent = 'Comando copiado.';
    } catch {
      command.closest('pre').focus();
      status.textContent = 'Selecciona el comando y cópialo con el teclado.';
    }
  });
}

const tabs = [...document.querySelectorAll('[role="tab"]')];

function showCase(selected) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

function showFromHash() {
  showCase(tabs.find(tab => tab.hash === location.hash) ?? tabs[0]);
}

function activate(tab) {
  history.replaceState(null, '', tab.hash);
  showCase(tab);
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener('click', event => {
    event.preventDefault();
    activate(tab);
  });
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
    activate(tabs[next]);
  });
}

showFromHash();
window.addEventListener('hashchange', showFromHash);
