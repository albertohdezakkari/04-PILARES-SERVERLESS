const input = document.querySelector('#model-json');
const result = document.querySelector('#model-result');
const status = document.querySelector('#model-status');
const feedback = document.querySelector('#model-feedback');
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

function renderTable(model, practice = false) {
  const name = model?.TableName;
  const partitionKey = model?.KeyAttributes?.PartitionKey;
  const sortKey = model?.KeyAttributes?.SortKey;
  const showPractice = practice && partitionKey?.AttributeName === 'EVENT_ID' && sortKey?.AttributeName === 'USER_ID';
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
      if (showPractice && column === 'CHECKED_IN_AT') {
        cell.append(element('span', value === undefined ? 'Sin entrada registrada' : 'Entrada registrada', 'model-key'));
      }
    }
    return { row, line };
  });
  const wrapper = element('div', undefined, 'model-table-scroll');
  wrapper.append(table);
  section.append(element('h3', name));
  if (showPractice) section.append(createPractice(renderedRows));
  section.append(wrapper);
  if (rows.length === 0) section.append(element('p', 'Sin registros de ejemplo.'));
  return section;
}

function createPractice(renderedRows) {
  const panel = element('div', undefined, 'model-practice');
  const buttons = element('div', undefined, 'actions');
  const all = element('button', 'Ver inscritos del evento');
  const one = element('button', 'Buscar a usuario-02');
  all.type = one.type = 'button';
  const condition = element('code');
  const output = element('p');
  output.setAttribute('role', 'status');

  function query(onlyOne) {
    let count = 0;
    for (const { row, line } of renderedRows) {
      const match = formatValue(row.EVENT_ID) === '1' &&
        (!onlyOne || formatValue(row.USER_ID) === 'usuario-02');
      line.hidden = !match;
      if (match) count++;
    }
    all.setAttribute('aria-pressed', String(!onlyOne));
    one.setAttribute('aria-pressed', String(onlyOne));
    condition.textContent = 'WHERE EVENT_ID = 1' + (onlyOne ? " AND USER_ID = 'usuario-02'" : '');
    const rows = count === 1 ? '1 inscripción' : count + ' inscripciones';
    output.textContent = rows + (onlyOne ? ' al buscar por evento y persona.' : ' al buscar por evento.');
  }

  all.addEventListener('click', () => query(false));
  one.addEventListener('click', () => query(true));
  buttons.append(all, one);
  panel.append(element('p', 'Predice cuántas filas saldrán y prueba las dos búsquedas con los datos de ejemplo.'), buttons, condition, output);
  query(false);
  return panel;
}

function showModel(message = status, practice = false) {
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
    result.replaceChildren(...model.DataModel.map(table => renderTable(table, practice)));
    status.textContent = 'Tablas del modelo: ' + model.DataModel.length + '. PK = partición, SK = ordenación, N = número, S = texto.';
    if (message === feedback) feedback.textContent = 'Tablas actualizadas en Diseñar → Probar el diseño.';
  } catch (error) {
    message.textContent = error.message;
  }
}

async function loadExample(message, onlyIfEmpty = false) {
  example.disabled = true;
  try {
    const response = await fetch('modelo-dynamodb.json?v=consulta-maximo');
    if (!response.ok) throw new Error('El ejemplo no está disponible en este momento.');
    const source = await response.text();
    if (onlyIfEmpty && input.value.trim()) return;
    input.value = source;
    showModel(message, true);
  } catch (error) {
    message.textContent = error.message;
  } finally {
    example.disabled = false;
  }
}

document.querySelector('#model-view').addEventListener('click', () => showModel(feedback));
example.addEventListener('click', () => loadExample(feedback));
loadExample(status, true);
