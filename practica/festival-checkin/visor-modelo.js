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
  const table = element('table');
  const header = table.createTHead().insertRow();
  for (const column of columns) {
    const cell = element('th', column);
    cell.scope = 'col';
    if (keys.has(column)) cell.append(element('span', keys.get(column), 'model-key'));
    header.append(cell);
  }
  const body = table.createTBody();
  for (const row of rows) {
    const line = body.insertRow();
    for (const column of columns) {
      line.insertCell().textContent = formatValue(Object.hasOwn(row, column) ? row[column] : undefined);
    }
  }
  const wrapper = element('div', undefined, 'model-table-scroll');
  wrapper.append(table);
  section.append(element('h3', name), wrapper);
  if (rows.length === 0) section.append(element('p', 'Sin registros de ejemplo.'));
  return section;
}

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
    result.replaceChildren(...model.DataModel.map(renderTable));
    status.textContent = 'Tablas del modelo: ' + model.DataModel.length + '. PK = partición, SK = ordenación, S = texto.';
    if (message === feedback) feedback.textContent = 'Tablas actualizadas arriba.';
  } catch (error) {
    message.textContent = error.message;
  }
}

async function loadExample(message, onlyIfEmpty = false) {
  example.disabled = true;
  try {
    const response = await fetch('modelo-dynamodb.json');
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
