import { explicaciones } from './lineas.js?v=eventos-persistencia';

const capas = [...document.querySelectorAll('.capas button')];
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
const avance = document.querySelector('#paso-actual');
const copia = document.querySelector('#estado-copia');
const puntos = [...document.querySelectorAll('[data-paso-ilustrado]')];
let actual = 0;

function mostrarPaso(indice) {
  actual = indice;
  capas.forEach((boton, posicion) => {
    const seleccionado = posicion === actual;
    boton.setAttribute('aria-pressed', String(seleccionado));
    document.getElementById(boton.getAttribute('aria-controls')).hidden = !seleccionado;
  });
  avance.textContent = `Paso ${actual + 1} de ${capas.length}`;
  anterior.disabled = actual === 0;
  for (const punto of puntos) punto.setAttribute('aria-pressed', String(Number(punto.dataset.pasoIlustrado) === actual));
  siguiente.disabled = actual === capas.length - 1;
  copia.textContent = '';
  activarLinea(lineasPorPaso[actual][0]);
}

function seleccionarCapa(indice) {
  mostrarPaso(indice);
  if (matchMedia('(max-width: 740px)').matches) {
    document.querySelector('.avance').scrollIntoView({ block: 'start' });
  }
}

capas.forEach((boton, indice) => {
  boton.addEventListener('click', () => seleccionarCapa(indice));
});
for (const punto of puntos) {
  punto.addEventListener('click', () => seleccionarCapa(Number(punto.dataset.pasoIlustrado)));
}
anterior.addEventListener('click', () => mostrarPaso(actual - 1));
siguiente.addEventListener('click', () => mostrarPaso(actual + 1));

const escenarios = {
  correcto: {
    entrada: '{ "eventId": 3, "title": "Concierto de aula" }',
    etiqueta: 'ÍTEM · DYNAMODB',
    resultado: '{ "EVENT_ID": 3, "TITLE": "Concierto de aula" }',
    detalle: 'DynamoDB confirma la escritura. El service devuelve el ID y el título.',
    parada: -1
  },
  'sin-titulo': {
    entrada: '{ "eventId": 3, "title": "" }',
    etiqueta: 'ERROR · SERVICE',
    resultado: 'Escribe un título para el evento',
    detalle: 'El service lanza el error antes de llamar al repository.',
    parada: 2
  },
  duplicado: {
    entrada: '{ "eventId": 3, "title": "Otro título" }',
    etiqueta: 'ERROR · DYNAMODB',
    resultado: 'ConditionalCheckFailedException',
    detalle: 'La tabla ya contiene el evento 3. La condición rechaza la escritura y el título original se conserva.',
    parada: 5
  }
};

const entrada = document.querySelector('#entrada');
const etiqueta = document.querySelector('#resultado-etiqueta');
const resultado = document.querySelector('#resultado');
const detalle = document.querySelector('#resultado-detalle');
document.querySelector('#escenario').addEventListener('change', ({ target }) => {
  const escenario = escenarios[target.value];
  entrada.textContent = escenario.entrada;
  etiqueta.textContent = escenario.etiqueta;
  resultado.textContent = escenario.resultado;
  detalle.textContent = escenario.detalle;
  capas.forEach((boton, indice) => {
    boton.parentElement.toggleAttribute('data-parada', indice === escenario.parada);
    boton.parentElement.toggleAttribute('data-pendiente', escenario.parada >= 0 && indice > escenario.parada);
  });
  mostrarPaso(escenario.parada < 0 ? 0 : escenario.parada);
});

const piezas = {
  terminal: 'Terminal · La ficha entra en la función que indica el YAML.',
  entrega: 'Entrada · Lambda entrega el ID y el título al service.',
  control: 'Control · El service comprueba el ID y el título antes de guardar.',
  desvio: 'Salida de rechazo · Si un dato falla, la ficha se queda en el service.',
  prensa: 'Prensa · El repository prepara la escritura y el modelo adapta la ficha.',
  sello: 'Sello · El modelo cambia la etiqueta del campo. Su valor viaja intacto.',
  candado: 'Candado · DynamoDB protege el registro si la clave ya existe.',
  archivo: 'Archivador · DynamoDB guarda o recupera el ítem por EVENT_ID.'
};

const focoInicial = ['terminal', 'entrega', 'control', 'prensa', 'sello', 'terminal', 'archivo'];
const focosPorLinea = {
  2: { 5: 'desvio', 8: 'desvio', 11: 'prensa', 12: 'entrega' },
  3: { 12: 'candado', 13: 'candado', 16: 'archivo' },
  4: { 8: 'archivo', 9: 'archivo', 10: 'archivo', 11: 'archivo' }
};
const taller = document.querySelector('#taller');
const leyenda = document.querySelector('#taller-leyenda');
const lineasPorPaso = capas.map(() => []);
const textos = new WeakMap();
let lineaActiva;

function activarLinea(linea) {
  if (!linea) return;
  lineaActiva?.boton.setAttribute('aria-pressed', 'false');
  lineaActiva = linea;
  linea.boton.setAttribute('aria-pressed', 'true');
  linea.nota.textContent = `Línea ${linea.numero} · ${linea.explicacion}`;
  taller.dataset.pieza = linea.pieza;
  leyenda.textContent = piezas[linea.pieza];
}

for (const [bloque, caja] of [...document.querySelectorAll('.code-box')].entries()) {
  const pre = caja.querySelector('pre');
  const codigo = pre.querySelector('code');
  const original = codigo.textContent;
  const paso = Number(caja.closest('.paso').id.split('-')[1]) - 1;
  const notas = explicaciones[bloque];
  const filas = original.split('\n');
  if (filas.filter(fila => fila.trim()).length !== notas.length) continue;

  const nota = document.createElement('p');
  nota.id = `nota-linea-${bloque}`;
  nota.className = 'nota-linea';
  nota.setAttribute('aria-live', 'polite');
  pre.before(nota);
  textos.set(caja, original);
  codigo.replaceChildren();

  const lineas = [];
  for (const [indice, texto] of filas.entries()) {
    if (!texto.trim()) {
      const blanco = document.createElement('span');
      blanco.className = 'linea-blanca';
      codigo.append(blanco);
      continue;
    }
    const numero = indice + 1;
    const boton = document.createElement('button');
    boton.className = 'linea-codigo';
    boton.type = 'button';
    boton.dataset.numero = numero;
    boton.setAttribute('aria-pressed', 'false');
    boton.setAttribute('aria-controls', nota.id);
    boton.textContent = texto;
    const linea = {
      boton, nota, numero,
      explicacion: notas[lineas.length],
      pieza: focosPorLinea[bloque]?.[numero] ?? focoInicial[bloque]
    };
    boton.addEventListener('focus', () => activarLinea(linea));
    boton.addEventListener('click', () => activarLinea(linea));
    const posicion = lineas.length;
    boton.addEventListener('keydown', event => {
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      event.preventDefault();
      lineas[posicion + (event.key === 'ArrowUp' ? -1 : 1)]?.boton.focus();
    });
    codigo.append(boton);
    lineas.push(linea);
  }
  lineasPorPaso[paso].push(...lineas);
  nota.textContent = `Línea ${lineas[0].numero} · ${lineas[0].explicacion}`;
}

activarLinea(lineasPorPaso[0][0]);

for (const boton of document.querySelectorAll('[data-copy]')) {
  boton.addEventListener('click', async () => {
    const caja = boton.closest('.code-box');
    const texto = textos.get(caja) ?? caja.querySelector('pre code').textContent;
    try {
      await navigator.clipboard.writeText(texto);
      copia.textContent = 'Copiado.';
    } catch {
      copia.textContent = 'Abre el archivo en GitHub para copiar el texto.';
    }
  });
}

for (const enlace of document.querySelectorAll('[data-abrir-paso]')) {
  enlace.addEventListener('click', event => {
    const paso = Number(enlace.dataset.abrirPaso) - 1;
    mostrarPaso(paso);
    const numero = Number(enlace.dataset.abrirLinea);
    const lineas = lineasPorPaso[paso];
    const linea = lineas.findLast(item => item.numero === numero);
    if (linea) {
      event.preventDefault();
      linea.boton.focus();
    }
  });
}
