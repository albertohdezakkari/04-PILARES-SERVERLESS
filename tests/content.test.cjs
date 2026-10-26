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

test('los handlers TypeScript se comprueban, compilan y devuelven el contrato documentado', async () => {
  const path = require('node:path');
  const fixtures = path.resolve('node_modules/.cache/workbook-tests');
  fs.mkdirSync(fixtures, { recursive: true });
  const project = fs.mkdtempSync(path.join(fixtures, 'typescript-'));
  const compiler = require.resolve('typescript/bin/tsc');
  const files = lesson.phases.find(phase => phase.id === 'construye').sections[0].tabs;
  const initial = files.find(file => file.filename === 'hello.ts').code;
  const modified = lesson.phases.find(phase => phase.id === 'modifica').sections.find(section => section.type === 'fileLab').tabs[0].code;
  try {
    fs.mkdirSync(path.join(project, 'src'));
    fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({ type: 'module' }));
    fs.writeFileSync(path.join(project, 'tsconfig.json'), files.find(file => file.filename === 'tsconfig.json').code);
    for (const [code, message, service] of [[initial, 'Festival Control API online', undefined], [modified, 'Festival Control · equipo preparado', 'hello']]) {
      fs.writeFileSync(path.join(project, 'src/hello.ts'), code);
      const check = spawnSync(process.execPath, [compiler, '--noEmit'], { cwd: project, encoding: 'utf8' });
      assert.equal(check.status, 0, check.stdout + check.stderr);
      const build = spawnSync(process.execPath, [compiler], { cwd: project, encoding: 'utf8' });
      assert.equal(build.status, 0, build.stdout + build.stderr);
      const javascript = fs.readFileSync(path.join(project, 'dist/hello.js'), 'utf8');
      assert(!javascript.includes("from 'aws-lambda'"), 'La importación de tipos se elimina del código de ejecución');
      const module = await import('data:text/javascript,' + encodeURIComponent(javascript));
      const result = await module.handler({ httpMethod: 'GET', path: '/hello' });
      assert.equal(result.statusCode, 200);
      assert.equal(JSON.parse(result.body).message, message);
      assert.equal(JSON.parse(result.body).service, service);
    }
    fs.writeFileSync(path.join(project, 'src/hello.ts'), initial.replace('statusCode: 200', "statusCode: '200'"));
    const invalid = spawnSync(process.execPath, [compiler, '--noEmit'], { cwd: project, encoding: 'utf8' });
    assert.notEqual(invalid.status, 0, 'El compilador debe rechazar una respuesta cuyo statusCode es un string');
    assert(invalid.stdout.includes('Type \'string\' is not assignable to type \'number\''));
  } finally {
    fs.rmSync(project, { recursive: true, force: true });
  }
});
