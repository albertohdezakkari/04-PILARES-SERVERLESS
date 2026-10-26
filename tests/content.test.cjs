const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const context = { window: {} };
for (const file of fs.readdirSync('lessons').filter(file => file.endsWith('.js'))) {
  vm.runInNewContext(fs.readFileSync('lessons/' + file, 'utf8'), context, { filename: file });
}
const lesson = context.window.lesson01;

test('el bloque conserva ocho fases estables y asistentes completos', () => {
  assert.equal(lesson.phases.length, 8);
  const ids = new Set();
  for (const phase of lesson.phases) {
    assert(!ids.has(phase.id)); ids.add(phase.id);
    for (const section of phase.sections) {
      assert(!ids.has(section.id)); ids.add(section.id);
      if (section.type === 'wizard') for (const step of section.steps) {
        for (const field of ['id', 'learn', 'text', 'code', 'expected', 'check']) assert.equal(typeof step[field], 'string');
        assert(step.help.length);
      }
    }
  }
  assert.equal(Object.keys(context.window).length, 11);
});

test('los dos archivos JavaScript completos devuelven el contrato documentado', async () => {
  const initial = lesson.phases.find(phase => phase.id === 'construye').sections[0].tabs[1].code;
  const modified = lesson.phases.find(phase => phase.id === 'modifica').sections.find(section => section.type === 'fileLab').tabs[0].code;
  for (const [code, message, service] of [[initial, 'Festival Control API online', undefined], [modified, 'Festival Control · equipo preparado', 'hello']]) {
    const syntax = spawnSync(process.execPath, ['--check', '--input-type=module'], { input: code, encoding: 'utf8' });
    assert.equal(syntax.status, 0, syntax.stderr);
    const module = await import('data:text/javascript,' + encodeURIComponent(code));
    const result = await module.handler({ httpMethod: 'GET', path: '/hello' });
    assert.equal(result.statusCode, 200);
    assert.equal(JSON.parse(result.body).message, message);
    assert.equal(JSON.parse(result.body).service, service);
  }
});
