const form = document.querySelector('#dynamo-practice');
const feedback = document.querySelector('#dynamo-feedback');
const results = document.querySelector('#dynamo-results');

const event = { eventId: 1, title: 'Festival de otoño' };
const registration = {
  eventId: 1,
  userId: 'usuario-02',
  registeredAt: '2026-11-01T10:00:00.000Z'
};

function putText(id, text) {
  document.getElementById(id).textContent = text;
}

function putObject(id, object) {
  putText(id, JSON.stringify(object, null, 2));
}

form.addEventListener('change', change => {
  if (change.target.name === 'scenario') form.elements.prediction.value = '';
  feedback.textContent = '';
  results.hidden = true;
});

form.addEventListener('submit', submission => {
  submission.preventDefault();
  const values = new FormData(form);
  const scenario = values.get('scenario');
  const eventFound = scenario !== 'sin-evento';
  const item = scenario === 'inscrito' ? registration : null;

  putObject('dynamo-event', eventFound ? {
    Item: { EVENT_ID: event.eventId, TITLE: event.title }
  } : {});
  putText('dynamo-event-value', eventFound
    ? 'Item se guarda en la variable event.'
    : 'La respuesta carece de Item. event queda como undefined.');

  if (eventFound) {
    putObject('dynamo-registration', item ? {
      Item: {
        EVENT_ID: item.eventId,
        USER_ID: item.userId,
        REGISTERED_AT: item.registeredAt
      }
    } : {});
    putText('dynamo-registration-value', item
      ? 'Item se guarda en la variable registration.'
      : 'La respuesta carece de Item. registration queda como undefined.');
  } else {
    putText('dynamo-registration', 'Lectura omitida');
    putText('dynamo-registration-value', 'El return de la comprobación del evento termina la función.');
  }

  putText('dynamo-status', eventFound ? 'HTTP 200' : 'HTTP 404');
  putObject('dynamo-response', eventFound
    ? { ...event, registration: item }
    : { message: 'Evento no encontrado' });
  putText('dynamo-response-value', eventFound
    ? 'La respuesta traduce los atributos de DynamoDB al formato JSON de la API. Si falta la inscripción, envía null.'
    : 'El 404 indica que falta el evento.');

  results.hidden = false;
  feedback.textContent = values.get('prediction') === scenario
    ? 'Acertaste. Sigue las lecturas y localiza dónde se decide la respuesta.'
    : 'Revisa los tres pasos y vuelve a predecir dónde cambia la respuesta.';
});
