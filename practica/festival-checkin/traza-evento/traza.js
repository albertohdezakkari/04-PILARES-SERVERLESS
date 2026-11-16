const capas = [...document.querySelectorAll('.capas button')];
const anterior = document.querySelector('#anterior');
const siguiente = document.querySelector('#siguiente');
const avance = document.querySelector('#paso-actual');
const copia = document.querySelector('#estado-copia');
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
  siguiente.disabled = actual === capas.length - 1;
  copia.textContent = '';
}

capas.forEach((boton, indice) => {
  boton.addEventListener('click', () => {
    mostrarPaso(indice);
    if (matchMedia('(max-width: 740px)').matches) {
      document.querySelector('.avance').scrollIntoView({ block: 'start' });
    }
  });
});
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

for (const boton of document.querySelectorAll('[data-copy]')) {
  boton.addEventListener('click', async () => {
    const texto = boton.closest('.code-box').querySelector('pre code').textContent;
    try {
      await navigator.clipboard.writeText(texto);
      copia.textContent = 'Copiado.';
    } catch {
      copia.textContent = 'Selecciona el código y cópialo con el teclado.';
    }
  });
}
