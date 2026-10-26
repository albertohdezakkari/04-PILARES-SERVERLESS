/* Reconstruct the student's cumulative project from the actual copyable tabs. */
const fs = require('node:fs');
const path = require('node:path');
const { loadLessons } = require('./audit-lessons.cjs');
function snapshotThrough(number, root = path.resolve(__dirname, '..')) {
  const files = { 'backend/package.json': JSON.stringify({ type: 'module', scripts: { typecheck: 'tsc --noEmit', build: 'tsc' } }) };
  for (const lesson of loadLessons(root).filter(lesson => !lesson.evaluable)) {
    const n = Number(lesson.navTitle.split(' · ')[0]);
    if (n > number) break;
    for (const section of lesson.phases?.find(phase => phase.id === 'construye')?.sections || []) {
      if (section.type !== 'fileLab') continue;
      for (const file of section.tabs) if (/^(backend|mobile)\//.test(file.path)) files[file.path] = file.code;
    }
  }
  return files;
}
function writeSnapshot(files, directory) {
  for (const [name, content] of Object.entries(files)) {
    const target = path.join(directory, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
}
module.exports = { snapshotThrough, writeSnapshot };
