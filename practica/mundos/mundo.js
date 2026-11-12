import { mundos } from './catalogo.js';

const mundo = mundos.find(({ id }) => id === new URLSearchParams(location.search).get('mundo'));
const byId = id => document.getElementById(id);

if (mundo) {
  mostrarMundo(mundo);
}

function mostrarMundo({ id, titulo, entidad, registro, persona, rutaEntidad, rutaRegistro, prefEntidad, prefRegistro, prefPersona, inicial, final, detalles }) {
  const [a, b] = [prefEntidad + '-01', prefEntidad + '-02'];
  const [uno, dos, tres] = [prefRegistro + '-01', prefRegistro + '-02', prefRegistro + '-03'];
  const [p, q] = [prefPersona + '-01', prefPersona + '-02'];
  const valores = {
    titulo, 'tipo-registro': registro, ejemplo: uno, detalle: detalles[0],
    mision: 'En este mundo necesitas registrar cada ' + registro + ' con el código de ' + entidad + ' y el de ' + persona + '. Construye un servicio para crear el registro, consultarlo y dejar constancia de su cierre.',
    'nombre-entidad': entidad.toUpperCase(), 'nombre-registro': registro.toUpperCase(), 'nombre-persona': persona.toUpperCase(),
    'id-entidad': a, 'id-registro': uno, 'id-persona': p,
    'col-entidad': entidad, 'col-registro': registro, 'col-persona': persona,
    'ficha-registro': uno, 'ficha-persona-label': persona,
    ruta: '/' + rutaEntidad + '/{entidadId}/' + rutaRegistro + '/{registroId}',
    ampliacion: 'Crea también ' + dos + ' y ' + tres + ' con los datos de Diseñar. Consulta la tabla por ' + a + ' y comprueba que aparecen ' + uno + ' y ' + dos + '. Consulta tu índice por ' + p + ' y comprueba que aparecen ' + uno + ' y ' + tres + '.'
  };
  for (const [campo, valor] of Object.entries(valores)) byId(campo).textContent = valor;
  document.title = titulo + ' · Serverless';

  for (const fila of [[a, uno, p, detalles[0]], [a, dos, q, detalles[1]], [b, tres, p, detalles[2]]]) {
    const tr = byId('filas').insertRow();
    for (const valor of fila) tr.insertCell().textContent = valor;
  }
  addCards('acciones', [
    ['Consulta el registro', 'Usa los códigos ' + a + ' y ' + uno + ' para leer el detalle, la persona responsable y el estado.'],
    ['Crea el registro', 'Guarda el detalle, el código de ' + persona + ' y la hora de creación. Protege la primera escritura.'],
    ['Completa el registro', 'Registra la hora de cierre. Una repetición debe conservar la primera hora.']
  ]);
  addCards('preguntas', [
    ['Si partes de ' + a, '¿Qué clave agruparía sus registros? ¿Qué atributo distingue cada fila del grupo?'],
    ['Si partes de ' + p, '¿Qué clave usarías en un índice para encontrar sus registros? Dibuja cómo ordenarías las filas.']
  ]);

  byId('preparar').textContent = [
    'node --version', 'mkdir -p ' + id, 'cd ' + id, 'npm init -y',
    'npm install --save-dev --save-exact serverless@4.45.0',
    'npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb',
    'mkdir -p src/registros', 'ls -ld src/registros'
  ].join('\n');

  const post = 'curl -i -X POST "$registro" -H \'Content-Type: application/json\' -d \'' + JSON.stringify({ personaId: p, detalle: detalles[0] }) + '\'';
  byId('comandos-prueba').textContent = [
    "api_url='PEGA_AQUI_LA_URL'",
    'registro="$api_url/' + rutaEntidad + '/' + a + '/' + rutaRegistro + '/' + uno + '"',
    'curl -i "$registro"', post, post, 'curl -i -X PATCH "$registro"',
    'curl -i -X PATCH "$registro"', 'curl -i "$registro"'
  ].join('\n');

  const estados = [
    ['Sin registro', '—', '—', '—', '—', 'GET · 404 · Todavía falta el registro.'],
    [inicial, detalles[0], p, '09:10 UTC', '—', 'POST · 201 · El registro se ha guardado.'],
    [final, detalles[0], p, '09:10 UTC', '09:36 UTC', 'PATCH · 200 · El registro conserva las dos horas.']
  ];
  const campos = ['ticket-state', 'ficha-detalle', 'ficha-persona', 'ficha-creacion', 'ficha-cierre', 'ticket-result'];
  const botones = [...document.querySelectorAll('[data-status]')];
  function mostrarEstado(posicion) {
    estados[posicion].forEach((texto, index) => { byId(campos[index]).textContent = texto; });
    botones.forEach((boton, index) => boton.setAttribute('aria-pressed', String(index === posicion)));
  }
  botones.forEach(boton => boton.addEventListener('click', () => mostrarEstado(Number(boton.dataset.status))));
  mostrarEstado(0);

  const tabs = [...document.querySelectorAll('.tabs a')];
  const panels = document.querySelectorAll('[data-step]');
  function mostrarPaso() {
    const active = tabs.find(tab => tab.hash === location.hash) ?? tabs[0];
    for (const tab of tabs) {
      if (tab === active) tab.setAttribute('aria-current', 'step');
      else tab.removeAttribute('aria-current');
    }
    for (const panel of panels) panel.hidden = '#' + panel.id !== active.hash;
  }
  window.addEventListener('hashchange', mostrarPaso);
  mostrarPaso();

  for (const command of document.querySelectorAll('.command')) {
    const button = document.createElement('button');
    const feedback = document.createElement('span');
    button.type = 'button';
    button.textContent = 'Copiar comando';
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
  byId('ficha').hidden = false;
  byId('recorrido').hidden = false;
}

function addCards(id, cards) {
  for (const [titulo, texto] of cards) {
    const li = document.createElement('li');
    const heading = document.createElement('h3');
    const p = document.createElement('p');
    heading.textContent = titulo;
    p.textContent = texto;
    li.append(heading, p);
    byId(id).append(li);
  }
}
