const tabs = [...document.querySelectorAll('.tabs a')];
const panels = document.querySelectorAll('[data-step]');

function showStep() {
  const active = tabs.find(tab => tab.hash === location.hash) ?? tabs[0];
  for (const tab of tabs) {
    if (tab === active) tab.setAttribute('aria-current', 'step');
    else tab.removeAttribute('aria-current');
  }
  for (const panel of panels) panel.hidden = '#' + panel.id !== active.hash;
}

window.addEventListener('hashchange', showStep);
showStep();

const states = {
  consulta: {
    state: 'Sin orden', job: '—', worker: '—', open: '—', close: '—',
    result: 'GET · 404 · La orden todavía no existe.'
  },
  abierta: {
    state: 'Abierta', job: 'Ajustar freno trasero', worker: 'mec-03', open: '09:10 UTC', close: '—',
    result: 'POST · 201 · La orden se ha guardado.'
  },
  terminada: {
    state: 'Terminada', job: 'Ajustar freno trasero', worker: 'mec-03', open: '09:10 UTC', close: '09:36 UTC',
    result: 'PATCH · 200 · La orden conserva la apertura y tiene hora de cierre.'
  }
};
const stateButtons = document.querySelectorAll('[data-state]');
for (const button of stateButtons) {
  button.addEventListener('click', () => {
    for (const choice of stateButtons) choice.setAttribute('aria-pressed', String(choice === button));
    for (const [field, value] of Object.entries(states[button.dataset.state])) {
      document.getElementById('ticket-' + field).textContent = value;
    }
  });
}

for (const command of document.querySelectorAll('.command')) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copiar comando';
  const feedback = document.createElement('span');
  feedback.setAttribute('role', 'status');
  command.prepend(button, feedback);
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(command.querySelector('code').textContent);
      feedback.textContent = 'Copiado.';
    } catch {
      feedback.textContent = 'Selecciona el comando y cópialo con el teclado.';
    }
  });
}
