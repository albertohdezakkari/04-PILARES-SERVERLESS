import { mundos } from '../catalogo.js';

const form = document.querySelector('#selector');
const correo = document.querySelector('#correo');
const boton = form.querySelector('button');
const mensaje = document.querySelector('#mensaje');
const bloque = new URLSearchParams(location.hash.slice(1)).get('grupo');

if (bloque) {
  history.replaceState(null, '', location.pathname + location.search);
  try {
    const datos = leerGrupo(bloque);
    const asignaciones = new Map(datos.map(({ email, mundo }) => [email, mundo]));
    for (const email of [...asignaciones.keys()].sort()) {
      correo.add(new Option(email, email));
    }
    form.hidden = false;
    mensaje.hidden = true;
    correo.addEventListener('change', () => {
      boton.disabled = !asignaciones.has(correo.value);
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const mundo = asignaciones.get(correo.value);
      if (mundo) location.assign('../?mundo=' + encodeURIComponent(mundo) + '#caso');
    });
  } catch {
    mensaje.textContent = 'Este enlace de clase está incompleto. Vuelve a abrir el enlace de Classroom.';
  }
}

function leerGrupo(codigo) {
  const bytes = Uint8Array.from(atob(codigo.replace(/-/g, '+').replace(/_/g, '/')), letra => letra.charCodeAt(0));
  const { version, dominio, asignaciones } = JSON.parse(new TextDecoder().decode(bytes));
  const ids = new Set(mundos.map(({ id }) => id));
  if (version !== 1 || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(dominio) || !Array.isArray(asignaciones) ||
      asignaciones.length < 1 || asignaciones.length > ids.size) throw new Error('Grupo inválido');

  const vistos = new Set();
  const ocupados = new Set();
  return asignaciones.map(([usuario, mundo]) => {
    if (typeof usuario !== 'string' || !/^[a-z0-9._+-]+$/i.test(usuario) ||
        !ids.has(mundo) || vistos.has(usuario) || ocupados.has(mundo)) throw new Error('Asignación inválida');
    vistos.add(usuario);
    ocupados.add(mundo);
    return { email: usuario + '@' + dominio, mundo };
  });
}
