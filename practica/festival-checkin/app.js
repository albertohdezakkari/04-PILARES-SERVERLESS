const phaseButtons = document.querySelectorAll('[data-phase]');
const methodButtons = document.querySelectorAll('[data-method]');
const mode = document.querySelector('#mode');
const endpoint = document.querySelector('#endpoint');
const user = document.querySelector('#user');
const response = document.querySelector('#response');
const feedback = document.querySelector('#feedback');
const passState = document.querySelector('#pass-state');
const title = document.querySelector('#screen-title');
const eventId = 'evt-001';
const demoTitle = 'Festival de otoño';
const demoRegistrations = new Map();

for (const button of phaseButtons) {
  button.addEventListener('click', () => {
    for (const other of phaseButtons) {
      const selected = other === button;
      other.setAttribute('aria-pressed', String(selected));
      document.getElementById(other.dataset.phase).hidden = !selected;
    }
  });
}

function clearScreen() {
  const demo = mode.value === 'demo';
  document.querySelector('#endpoint-field').hidden = demo;
  title.textContent = demo ? demoTitle : 'Evento del equipo';
  passState.textContent = 'Por consultar';
  feedback.textContent = demo ? 'Ensayo · datos en memoria' : 'AWS · pulsa Consultar para leer la API';
  response.textContent = 'Pulsa Consultar para empezar.';
}
mode.addEventListener('change', clearScreen);
user.addEventListener('input', clearScreen);
endpoint.addEventListener('input', clearScreen);

function demoRequest(method, userId) {
  const registration = demoRegistrations.get(userId);
  if (method === 'GET') {
    return { status: 200, body: { eventId, title: demoTitle, registration: registration ?? null } };
  }
  if (method === 'POST' && !registration) {
    demoRegistrations.set(userId, { userId, registeredAt: new Date().toISOString() });
    return { status: 201, body: { message: 'Inscripción creada' } };
  }
  if (method === 'PATCH' && registration && !registration.checkedInAt) {
    registration.checkedInAt = new Date().toISOString();
    return { status: 200, body: { message: 'Entrada registrada' } };
  }
  return { status: 409, body: { message: 'La operación no se puede aplicar a este estado' } };
}

function apiBase() {
  const value = endpoint.value.trim().replace(/\/$/, '');
  if (!/^https:\/\/[a-z0-9]+\.execute-api\.[a-z0-9-]+\.amazonaws\.com(?:\/[A-Za-z0-9_-]+)?$/.test(value)) {
    throw new Error('Introduce la URL HTTPS de invocación de API Gateway, sin la ruta /events.');
  }
  return value;
}

async function awsRequest(base, method, userId) {
  const path = '/events/' + eventId + '/registrations/' + encodeURIComponent(userId);
  const result = await fetch(base + path, { method, signal: AbortSignal.timeout(12000) });
  const body = await result.json().catch(() => ({ message: 'La API no devolvió JSON' }));
  return { status: result.status, body };
}

function showPass(body) {
  if (typeof body.title !== 'string' || !Object.hasOwn(body, 'registration')) {
    throw new Error('La respuesta GET no coincide con el contrato de la pestaña Lectura.');
  }
  title.textContent = body.title;
  passState.textContent = body.registration?.checkedInAt ? 'Entrada registrada'
    : body.registration ? 'Inscrito' : 'Sin inscripción';
}

async function run(method) {
  const userId = user.value.trim();
  const demo = mode.value === 'demo';
  const label = demo ? 'Ensayo' : 'AWS';
  if (!/^equipo-\d{2}$/.test(userId)) {
    feedback.textContent = 'Escribe un código como equipo-01.';
    return;
  }

  const controls = [...methodButtons, mode, user, endpoint];
  for (const control of controls) control.disabled = true;
  feedback.textContent = label + ' · consultando…';
  let result;
  try {
    const base = demo ? '' : apiBase();
    const request = verb => demo ? demoRequest(verb, userId) : awsRequest(base, verb, userId);
    result = await request(method);
    response.textContent = JSON.stringify(result.body, null, 2);
    feedback.textContent = label + ' · ' + method + ' → ' + result.status
      + (result.body.message ? ' · ' + result.body.message : '');
    if (method === 'GET' && result.status === 200) showPass(result.body);
    if (method !== 'GET' && result.status >= 200 && result.status < 300) {
      const read = await request('GET');
      if (read.status !== 200) throw new Error('La lectura posterior devolvió ' + read.status + '.');
      showPass(read.body);
    }
  } catch (error) {
    passState.textContent = 'Por comprobar';
    feedback.textContent = (result ? label + ' · ' + method + ' → ' + result.status + '. ' : '')
      + error.message + ' Revisa la URL, la ruta y CORS si estás en AWS.';
  } finally {
    for (const control of controls) control.disabled = false;
  }
}

for (const button of methodButtons) {
  button.addEventListener('click', () => run(button.dataset.method));
}
