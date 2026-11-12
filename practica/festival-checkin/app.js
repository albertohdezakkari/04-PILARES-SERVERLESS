const methodButtons = document.querySelectorAll('[data-method]');
const mode = document.querySelector('#mode');
const endpoint = document.querySelector('#endpoint');
const eventInput = document.querySelector('#event-id');
const user = document.querySelector('#user');
const response = document.querySelector('#response');
const feedback = document.querySelector('#feedback');
const requestTrace = document.querySelector('#request-trace');
const requestPath = document.querySelector('#request-path');
const requestModule = document.querySelector('#request-module');
const requestLesson = document.querySelector('#request-lesson');
const readFeedback = document.querySelector('#read-feedback');
const routes = {
  GET: { module: 'consultar', lesson: '#leer-pase' },
  POST: { module: 'inscribir', lesson: '#construir-post' },
  PATCH: { module: 'entrada', lesson: '#construir-patch' }
};
const passState = document.querySelector('#pass-state');
const title = document.querySelector('#screen-title');
const DEMO_EVENT_ID = 1;
const DEMO_TITLE = 'Festival de otoño';
const demoRegistrations = new Map();
let lastDemoRegistrationId = 0;

function clearScreen() {
  const demo = mode.value === 'demo';
  document.querySelector('#endpoint-field').hidden = demo;
  document.querySelector('#event-id-field').hidden = demo;
  requestTrace.hidden = true;
  readFeedback.hidden = true;
  title.textContent = demo ? DEMO_TITLE : 'Evento del equipo';
  passState.textContent = 'Por consultar';
  feedback.textContent = demo ? 'Ensayo · datos en memoria' : 'AWS · pulsa Consultar para leer la API';
  response.textContent = 'Pulsa Consultar para empezar.';
}
mode.addEventListener('change', clearScreen);
user.addEventListener('input', clearScreen);
endpoint.addEventListener('input', clearScreen);
eventInput.addEventListener('input', clearScreen);

function demoRequest(method, userId) {
  const registration = demoRegistrations.get(userId);
  if (method === 'GET') {
    return { status: 200, body: { eventId: DEMO_EVENT_ID, title: DEMO_TITLE, registration: registration ?? null } };
  }
  if (method === 'POST' && !registration) {
    const registrationId = ++lastDemoRegistrationId;
    demoRegistrations.set(userId, {
      eventId: DEMO_EVENT_ID,
      userId,
      registrationId,
      registeredAt: new Date().toISOString()
    });
    return { status: 201, body: { message: 'Inscripción creada', registrationId } };
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

function passPath(eventId, userId) {
  return '/events/' + eventId + '/registrations/' + encodeURIComponent(userId);
}

async function awsRequest(base, method, path) {
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
  const eventId = demo ? String(DEMO_EVENT_ID) : eventInput.value.trim();
  const label = demo ? 'Ensayo' : 'AWS';
  if (!userId) {
    feedback.textContent = 'Escribe un código como usuario-01.';
    return;
  }

  if (!/^[1-9]\d{0,18}$/.test(eventId)) {
    feedback.textContent = 'Escribe el ID numérico que devolvió la creación del evento.';
    return;
  }

  const controls = [...methodButtons, mode, user, endpoint, eventInput];
  for (const control of controls) control.disabled = true;
  const path = passPath(eventId, userId);
  readFeedback.hidden = true;
  requestPath.textContent = method + ' ' + path;
  requestModule.textContent = 'src/pases/' + routes[method].module + '.mjs';
  requestLesson.href = routes[method].lesson;
  requestTrace.hidden = false;
  response.textContent = 'Esperando respuesta…';
  feedback.textContent = label + ' · enviando ' + method + '…';
  let result;
  try {
    const base = demo ? '' : apiBase();
    const request = verb => demo ? demoRequest(verb, userId) : awsRequest(base, verb, path);
    result = await request(method);
    response.textContent = JSON.stringify(result.body, null, 2);
    feedback.textContent = label + ' · ' + method + ' → ' + result.status
      + (result.body.message ? ' · ' + result.body.message : '');
    if (method === 'GET') {
      if (result.status === 200) showPass(result.body);
      else passState.textContent = 'Por comprobar';
    }
    if (method !== 'GET' && result.status >= 200 && result.status < 300) {
      const read = await request('GET');
      if (read.status !== 200) throw new Error('La lectura posterior devolvió ' + read.status + '.');
      showPass(read.body);
      readFeedback.textContent = 'GET posterior → ' + read.status + ' · Pase actualizado desde la respuesta de lectura.';
      readFeedback.hidden = false;
    }
  } catch (error) {
    passState.textContent = 'Por comprobar';
    if (!result) response.textContent = 'Petición sin respuesta disponible.';
    feedback.textContent = (result ? label + ' · ' + method + ' → ' + result.status + '. ' : '')
      + error.message + ' Revisa la URL, la ruta y CORS si estás en AWS.';
  } finally {
    for (const control of controls) control.disabled = false;
  }
}

for (const button of methodButtons) {
  button.addEventListener('click', () => run(button.dataset.method));
}
