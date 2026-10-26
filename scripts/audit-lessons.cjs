/* Auditoría estructural por lotes. No sustituye la revisión didáctica. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const PHASES = ['destino','prepara','construye','prueba','entiende','modifica','comprueba','cierra'];
const profiles = { preparacion:'preparación del equipo', 'primer-serverless':'backend', get:'backend', post:'backend', crud:'backend', 'react-native':'cliente', 'rn-get':'integración local', 'rn-crud':'integración local', aws:'despliegue', cloud:'integración cloud', training:'evaluación por transferencia' };

function loadLessons(root = path.resolve(__dirname, '..')) {
  const context = { window: {} };
  for (const file of fs.readdirSync(path.join(root, 'lessons')).filter(file => file.endsWith('.js')).sort()) {
    vm.runInNewContext(fs.readFileSync(path.join(root, 'lessons', file), 'utf8'), context, { filename: file, timeout: 1000 });
  }
  vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context, { timeout: 1000 });
  return context.window.lessons;
}
function auditLesson(lesson) {
  const sections = lesson.phases ? lesson.phases.flatMap(phase => phase.sections) : lesson.sections;
  const checks = [];
  const add = (id, ok, detail) => checks.push({ id, status: ok ? 'OK' : 'PENDIENTE', detail });
  const has = type => sections.some(section => section.type === type);
  const files = sections.filter(section => section.type === 'fileLab').flatMap(section => section.tabs);
  const wizards = sections.filter(section => section.type === 'wizard');
  const checklists = sections.filter(section => section.type === 'checklist');
  const quizzes = sections.filter(section => section.type === 'quiz');
  if (lesson.evaluable) {
    add('transferencia', /Venue Control/.test(lesson.hero.title), 'Dominio diferente al ejemplo asistido.');
    add('sin-receta', !has('fileLab') && wizards.length === 0, 'No publicar archivos solución ni procedimientos asistidos.');
    add('requisitos-rubrica', has('productPreview') && sections.some(section => /RÚBRICA/.test(section.label || '')), 'Referencia funcional y criterios de evaluación visibles.');
  } else if (lesson.id === 'preparacion') {
    add('instalacion-desde-cero', wizards.flatMap(wizard => wizard.steps).length >= 9, 'Mantener la preparación completa del equipo y sus diagnósticos.');
    add('checkpoint-equipo', checklists.length > 0, 'Verificación del entorno antes del primer proyecto.');
  } else {
    add('recorrido-por-fases', lesson.phases?.map(phase => phase.id).join('|') === PHASES.join('|'), 'Ocho fases del patrón validable del bloque 01.');
    add('objetivo-destino', has('orientation') && has('routeDiagram'), 'Objetivo, punto de partida y resultado reconocible.');
    add('conceptos-antes-del-codigo', has('conceptGrid') && lesson.phases?.[0]?.id === 'destino', 'La posición se comprueba; la claridad de las explicaciones se revisa manualmente.');
    add('archivos-completos', files.length > 0 && files.every(file => file.path && file.responsibility && file.instruction && file.learn?.length && file.code?.trim() && !/\/\/\s*(resto del c[oó]digo|TODO)|IMPLEMENTAR_AQUI/i.test(file.code)), 'Ruta, responsabilidad, explicación y contenido completo.');
    add('typescript', (files.some(file => /\.tsx?$/.test(file.filename)) || (lesson.id === 'aws' && lesson.validation?.sourceLanguage === 'typescript' && files.some(file => file.filename === 'serverless.yml' && /dist\/events\//.test(file.code)))) && !files.some(file => /\.jsx?$/.test(file.filename)), 'Código TS/TSX; el bloque AWS conserva los fuentes tipados de 04 y cambia sólo configuración.');
    add('entiende', has('explainRows'), 'Correspondencia código → comportamiento.');
    add('modificacion-guiada', has('guidedChange') && sections.some(section => section.type === 'guidedChange' && section.expected && section.constraints && section.steps?.length), 'Cambio pequeño, resultado y condiciones que conservar.');
    add('comprension-formativa', quizzes.length > 0 && quizzes.every(quiz => quiz.options?.length === 4 && Number.isInteger(quiz.correct) && quiz.correct >= 0 && quiz.correct < 4 && quiz.explanation), 'Pregunta, cuatro opciones, respuesta y explicación.');
    add('cierre-evidencias', files.some(file => file.filename === 'README.md') && !!lesson.phases?.find(phase => phase.id === 'cierra')?.sections.some(section => section.type === 'checklist'), 'Documentación breve, evidencias y cierre.');
    const ids = [...(lesson.phases || []).map(phase => phase.id), ...sections.map(section => section.id)];
    add('identificadores-estables', ids.length > 0 && ids.every(Boolean) && new Set(ids).size === ids.length, 'El seguimiento no depende de la posición accidental de las tarjetas.');
  }
  add('pasos-cerrados', wizards.length > 0 && wizards.every(wizard => Array.isArray(wizard.steps) && wizard.steps.length > 0 && wizard.steps.every(step => ['learn','text','expected','check'].every(field => typeof step[field] === 'string' && step[field].trim()) && step.help?.length)), 'Entiende, hazlo, resultado, diagnóstico y checkpoint.');
  if (lesson.evaluable) checks.pop(); // El entrenamiento no asistido no debe tener un wizard.
  const missing = checks.filter(check => check.status !== 'OK').map(check => check.id);
  return { id: lesson.id, title: lesson.navTitle, profile: profiles[lesson.id] || 'asistido', format: lesson.phases ? 'por fases' : 'anterior', status: missing.length ? 'ADAPTAR' : 'ESTRUCTURA OK', missing, checks,
    manual: lesson.evaluable ? ['Transferencia real, requisitos coherentes, rúbrica y ausencia de solución.'] : ['Conceptos explicados antes de usarse; no introducir conocimientos previos ficticios.','Cada acción coincide con sus archivos, comandos, respuesta esperada y diagnóstico.','Continuidad técnica con los bloques anterior y siguiente; mismos tipos, rutas y contratos.','Revisión visual de lectura, tamaño, desplazamiento y controles en escritorio y móvil.','Procedimientos externos comprobados en el entorno real cuando intervengan Windows, cuentas, red o AWS.'] };
}
function auditAll(lessons = loadLessons()) { return lessons.map(lesson => {try{return auditLesson(lesson);}catch(error){return {id:lesson.id,title:lesson.navTitle,status:'DATOS INVÁLIDOS',missing:['datos-invalidos'],error:error.message};}}); }
if (require.main === module) {
  const result = auditAll();
  const strictIndex = process.argv.indexOf('--strict');
  const requested = strictIndex >= 0 ? (process.argv[strictIndex + 1] || '').split(',').filter(Boolean) : [];
  if (process.argv.includes('--json')) console.log(JSON.stringify({ scope:'Auditoría estructural; requiere revisión pedagógica y pruebas', lessons:result }, null, 2));
  else {
    console.log('AUDITORÍA POR LOTES · estructura y cobertura, no certificación pedagógica\n');
    for (const lesson of result) console.log(`${lesson.title}: ${lesson.status}\n  Perfil: ${lesson.profile}\n  ${lesson.missing.length ? 'Pendiente: '+lesson.missing.join(', ') : 'Comprobaciones estructurales cubiertas; revisar coherencia y ejecutar pruebas.'}`);
  }
  if (strictIndex >= 0 && (!requested.length || requested.some(id => !result.some(lesson => lesson.id === id && !lesson.missing.length)))) process.exitCode = 1;
}
module.exports = { loadLessons, auditLesson, auditAll };
