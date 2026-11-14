const input = document.querySelector('#model-json');
const result = document.querySelector('#model-result');
const status = document.querySelector('#model-status');
const feedback = document.querySelector('#model-feedback');
const search = document.querySelector('#model-search');
const preview = document.querySelector('#model-search-preview');
const dataToggle = document.querySelector('#model-data-toggle');
const example = document.querySelector('#model-example');

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function formatValue(value) {
  if (value === undefined) return '—';
  if (value !== null && typeof value === 'object') {
    if (Object.hasOwn(value, 'S')) return value.S;
    if (Object.hasOwn(value, 'N')) return value.N;
    if (Object.hasOwn(value, 'BOOL')) return String(value.BOOL);
    if (value.NULL === true) return 'null';
  }
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function renderTable(model) {
  const name = model?.TableName;
  const partitionKey = model?.KeyAttributes?.PartitionKey;
  const sortKey = model?.KeyAttributes?.SortKey;
  const rows = model?.TableData ?? [];
  const attributes = model?.NonKeyAttributes ?? [];
  if (typeof name !== 'string' || !name.trim() || !partitionKey?.AttributeName) {
    throw new Error('Cada tabla necesita un nombre y una clave de partición.');
  }
  if (!Array.isArray(rows) || rows.some(row => !row || typeof row !== 'object' || Array.isArray(row)) || !Array.isArray(attributes)) {
    throw new Error('Revisa TableData y NonKeyAttributes de la tabla ' + name + '.');
  }

  const keys = new Map([[partitionKey.AttributeName, 'PK · ' + (partitionKey.AttributeType ?? '?')]]);
  if (sortKey?.AttributeName) keys.set(sortKey.AttributeName, 'SK · ' + (sortKey.AttributeType ?? '?'));
  const columns = new Set(keys.keys());
  for (const attribute of attributes) {
    if (attribute?.AttributeName) columns.add(attribute.AttributeName);
  }
  for (const row of rows) {
    for (const name of Object.keys(row)) columns.add(name);
  }

  const section = element('section');
  section.dataset.modelTable = name;
  const table = element('table');
  const header = table.createTHead().insertRow();
  for (const column of columns) {
    const cell = element('th', column);
    cell.scope = 'col';
    if (keys.has(column)) cell.append(element('span', keys.get(column), 'model-key'));
    header.append(cell);
  }
  const body = table.createTBody();
  const renderedRows = rows.map(row => {
    const line = body.insertRow();
    for (const column of columns) {
      const value = Object.hasOwn(row, column) ? row[column] : undefined;
      const cell = line.insertCell();
      cell.textContent = formatValue(value);
    }
    return { row, line };
  });
  const wrapper = element('div', undefined, 'model-table-scroll');
  wrapper.append(table);
  section.append(element('h3', name));
  section.append(wrapper);
  if (rows.length === 0) section.append(element('p', 'Sin registros de ejemplo.'));
  return { name, section, renderedRows };
}

function profileName(row) {
  const names = [row.FIRST_NAME, row.LAST_NAME].filter(value => value !== undefined);
  return names.map(formatValue).join(' ') || formatValue(row.DISPLAY_NAME ?? row.USER_ID);
}

function createPractice(events, registrations, users) {
  const event = events.renderedRows.find(({ row }) => formatValue(row.EVENT_ID) === '1');
  const person = users.renderedRows.find(({ row }) => formatValue(row.USER_ID) === 'usuario-02');
  if (!event || !person) return null;

  const title = formatValue(event.row.TITLE);
  const firstName = person.row.FIRST_NAME ? formatValue(person.row.FIRST_NAME) : profileName(person.row);
  const filters = element('div', undefined, 'actions model-search-filters');
  const byEvent = element('button', 'Todos los inscritos');
  const byPerson = element('button', 'Solo el pase de ' + firstName);
  byEvent.type = byPerson.type = 'button';
  filters.append(byEvent, byPerson);
  const summary = element('p', undefined, 'model-search-count');
  summary.setAttribute('role', 'status');
  const passes = element('ul', undefined, 'model-search-passes');
  const key = element('code', undefined, 'model-search-key');
  const explanation = element('p', undefined, 'model-search-explanation');

  function query(onlyOne) {
    const matches = registrations.renderedRows.filter(({ row }) =>
      formatValue(row.EVENT_ID) === '1' &&
      (!onlyOne || formatValue(row.USER_ID) === 'usuario-02')
    );
    const selected = new Set(matches);
    for (const entry of registrations.renderedRows) {
      entry.line.toggleAttribute('data-model-match', selected.has(entry));
    }
    event.line.setAttribute('data-model-match', '');
    person.line.toggleAttribute('data-model-match', onlyOne);
    passes.replaceChildren(...matches.map(({ row }) => {
      const userId = formatValue(row.USER_ID);
      const profile = users.renderedRows.find(({ row }) => formatValue(row.USER_ID) === userId);
      const pass = element('li');
      pass.append(
        element('strong', profile ? profileName(profile.row) : userId),
        element('code', userId)
      );
      return pass;
    }));
    byEvent.setAttribute('aria-pressed', String(!onlyOne));
    byPerson.setAttribute('aria-pressed', String(onlyOne));
    key.textContent = 'EVENT_ID = 1' + (onlyOne ? ' · USER_ID = usuario-02' : '');
    explanation.textContent = onlyOne
      ? 'En el mismo festival, el código de Leo distingue su pase.'
      : 'El número del festival agrupa a todas las personas inscritas.';
    summary.textContent = matches.length === 1 ? '1 pase encontrado' : matches.length + ' pases encontrados';
  }

  byEvent.addEventListener('click', () => query(false));
  byPerson.addEventListener('click', () => query(true));
  const criteria = element('div', undefined, 'model-search-criteria');
  criteria.append(element('h4', title), filters, explanation, key);
  const results = element('div', undefined, 'model-search-results');
  results.append(summary, passes);
  query(false);
  return { criteria, results };
}

dataToggle.addEventListener('click', () => {
  const open = result.hidden;
  result.hidden = !open;
  dataToggle.setAttribute('aria-expanded', String(open));
  dataToggle.textContent = open ? 'Ocultar las tablas de DynamoDB' : 'Ver las tres tablas de DynamoDB';
});

function showModel(message = status) {
  message.textContent = '';
  let model;
  try {
    model = JSON.parse(input.value);
  } catch {
    message.textContent = 'El texto no es JSON válido. Pega el contenido completo del modelo.';
    return;
  }
  if (!Array.isArray(model?.DataModel) || model.DataModel.length === 0) {
    message.textContent = 'Falta DataModel con las definiciones de las tablas. Prueba con «Cargar ejemplo».';
    return;
  }
  try {
    const tables = model.DataModel.map(renderTable);
    const byName = new Map(tables.map(table => [table.name, table]));
    const events = byName.get('FCI_EVENTOS');
    const registrations = byName.get('FCI_INSCRIPCIONES');
    const users = byName.get('FCI_USUARIOS');
    const practice = events && registrations && users ? createPractice(events, registrations, users) : null;

    result.replaceChildren(...tables.map(({ section }) => section));
    search.replaceChildren(...(practice ? [practice.criteria] : []));
    preview.replaceChildren(...(practice ? [practice.results] : []));
    preview.hidden = !practice;
    search.hidden = !practice;
    result.hidden = Boolean(practice);
    dataToggle.hidden = !practice;
    dataToggle.setAttribute('aria-expanded', 'false');
    dataToggle.textContent = 'Ver las tres tablas de DynamoDB';
    status.textContent = practice ? '' : 'Tablas del modelo: ' + tables.length + '.';
    if (message === feedback) feedback.textContent = 'Tablas actualizadas en Modelo de datos → Probar el diseño.';
  } catch (error) {
    message.textContent = error.message;
  }
}

async function loadExample(message, onlyIfEmpty = false) {
  example.disabled = true;
  try {
    const response = await fetch('modelo-dynamodb.json?v=perfil-usuario');
    if (!response.ok) throw new Error('El ejemplo no está disponible en este momento.');
    const source = await response.text();
    if (onlyIfEmpty && input.value.trim()) return;
    input.value = source;
    showModel(message);
  } catch (error) {
    message.textContent = error.message;
  } finally {
    example.disabled = false;
  }
}

document.querySelector('#model-view').addEventListener('click', () => showModel(feedback));
example.addEventListener('click', () => loadExample(feedback));
loadExample(status, true);
