/* Execute the exact student snapshots. The HTTP harness does not emulate AWS deployment or Framework authentication. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');
const YAML = require('yaml');
const { chromium } = require('@playwright/test');
const { snapshotThrough, writeSnapshot } = require('./extract-snapshot.cjs');
const root = path.resolve(__dirname, '..');
const fixture = path.join(root, 'node_modules/.cache/course-validation');
const backend = path.join(fixture, 'backend');
const mobile = path.join(fixture, 'mobile');
const compiler = require.resolve('typescript/bin/tsc');
const run = (cmd, args, cwd) => { const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', timeout: 300000, env: { ...process.env, CI: '1', EXPO_NO_TELEMETRY: '1' } }); assert.equal(r.status, 0, (r.stdout || '') + (r.stderr || '') + (r.error || '')); return r.stdout; };
const event = (body = null, id = 'EVT-101', method = 'GET') => ({ body: body === null ? null : typeof body === 'string' ? body : JSON.stringify(body), pathParameters: id ? { id } : null, httpMethod: method, headers: {}, requestContext: {}, queryStringParameters: null });
const load = async name => (await import(pathToFileURL(path.join(backend, 'dist', name + '.js')).href)).handler;
const input = { artist: 'Nova Pulse', space: 'Main Stage', time: '21:00', status: 'CONFIRMED' };
async function check(handler, body, id, status, verify) { const r = await handler(event(body, id)); assert.equal(r.statusCode, status); if (verify) verify(JSON.parse(r.body)); return r; }
async function main() {
  for (const n of [2, 3, 4, 8]) {
    writeSnapshot(snapshotThrough(n), fixture);
    const config = YAML.parse(fs.readFileSync(path.join(backend, 'serverless.yml'), 'utf8'));
    run(process.execPath, [compiler, '--noEmit'], backend);
    run(process.execPath, [compiler], backend);
    for (const f of Object.values(config.functions)) {
      assert(fs.existsSync(path.join(backend, f.handler.replace(/\.handler$/, '.js'))), f.handler);
      assert(f.events[0].http.cors);
    }
    assert.equal(Object.keys(config.functions).length, n === 2 ? 2 : n === 3 ? 3 : 7);
    if (n === 2) { const get = await load('getEvent'); await check(get, null, 'EVT-104', 200, r => assert.equal(r.id, 'EVT-104')); await check(get, null, null, 400); }
    if (n === 3) { const post = await load('createEvent'); await check(post, input, null, 201); for (const body of ['{', null, [], {}, { ...input, status: 'PAUSED' }, { ...input, time: '29:80' }]) await check(post, body, null, 400); }
    console.log('Backend ' + n + ': TypeScript, compilación y rutas correctos.');
  }
  const handlers = {};
  for (const name of ['list','get','create','replace','update','delete']) handlers[name] = await load('events/' + name);
  await check(handlers.list, null, null, 200, r => assert.equal(r.length, 2));
  await check(handlers.get, null, 'EVT-101', 200, r => assert.equal(r.artist, 'Neon Waves'));
  for (const name of ['get','replace','update','delete']) { await check(handlers[name], null, null, 400); await check(handlers[name], input, 'NO-EXISTE', 404); }
  await check(handlers.create, input, null, 201, r => assert.equal(r.id, 'EVT-NEW'));
  await check(handlers.replace, input, 'EVT-101', 200, r => assert.equal(r.operation, 'REPLACED'));
  for (const name of ['create','replace']) for (const body of ['{', [], null, {}, { ...input, artist: ' ' }, { ...input, space: 3 }, { ...input, time: '24:00' }, { ...input, status: 'PAUSED' }]) await check(handlers[name], body, 'EVT-101', 400);
  await check(handlers.update, { status: 'CANCELLED' }, 'EVT-101', 200, r => assert.equal(r.changes.status, 'CANCELLED'));
  for (const body of ['{', null, {}, { status: 'PAUSED' }, { status: 'CANCELLED', time: '22:00' }]) await check(handlers.update, body, 'EVT-101', 400);
  await check(handlers.delete, null, 'EVT-102', 200, r => assert.equal(r.operation, 'DELETED'));
  await check(handlers.list, null, null, 200, r => { assert.equal(r.length, 2); assert.equal(r[0].status, 'CONFIRMED'); });
  const r = await check(handlers.get, null, 'NO-EXISTE', 404); assert.equal(r.headers['Access-Control-Allow-Origin'], '*');
  console.log('Contratos de 04: consultas, escrituras, errores y ausencia de persistencia comprobados.');
  for (const n of [5, 6, 7, 9]) {
    writeSnapshot(snapshotThrough(n), fixture);
    if (!fs.existsSync(path.join(mobile, 'node_modules/expo/package.json'))) run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install', '--no-audit', '--no-fund'], mobile);
    run(process.execPath, [path.join(mobile, 'node_modules/typescript/bin/tsc'), '--noEmit'], mobile);
    console.log('Cliente ' + n + ': TypeScript/TSX correcto.');
  }
  // Test the final client against real compiled handlers, replacing only the environment URL.
  const apiPath = path.join(mobile, 'src/api.ts');
  const original = fs.readFileSync(apiPath, 'utf8');
  const requests = [];
  const api = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    let body = ''; for await (const chunk of req) body += chunk;
    const url = new URL(req.url, 'http://localhost'); const id = url.pathname.split('/')[3];
    const name = req.method === 'GET' ? id ? 'get' : 'list' : { POST: 'create', PUT: 'replace', PATCH: 'update', DELETE: 'delete' }[req.method];
    requests.push(req.method + ' ' + url.pathname);
    const result = await handlers[name](event(body || null, id, req.method));
    res.writeHead(result.statusCode, result.headers); res.end(result.body);
  });
  await new Promise(resolve => api.listen(0, '127.0.0.1', resolve));
  const apiBase = 'http://127.0.0.1:' + api.address().port + '/dev';
  fs.writeFileSync(apiPath, original.replace(/https:\/\/TU_API[^']+/, apiBase));
  let web, browser;
  try {
    console.log(run(process.execPath, [path.join(mobile, 'node_modules/expo/bin/cli'), 'export', '--platform', 'web'], mobile).split('\n').slice(-8).join('\n'));
    web = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const target = path.join(mobile, 'dist', pathname === '/' ? 'index.html' : pathname);
      if (!target.startsWith(path.join(mobile, 'dist') + path.sep) || !fs.existsSync(target)) { res.writeHead(404); res.end(); return; }
      res.setHeader('Content-Type', target.endsWith('.js') ? 'application/javascript' : target.endsWith('.html') ? 'text/html' : 'application/octet-stream'); fs.createReadStream(target).pipe(res);
    });
    await new Promise(resolve => web.listen(0, '127.0.0.1', resolve));
    browser = await chromium.launch(); const page = await browser.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:' + web.address().port);
    await page.getByText('Neon Waves', { exact: true }).waitFor();
    for (const [button, expected] of [['POST crear','EVT-NEW'],['PUT reemplazar EVT-101','REPLACED'],['PATCH cancelar EVT-101','UPDATED'],['DELETE EVT-102','DELETED']]) {
      await page.getByRole('button', { name: button, exact: true }).click();
      await page.getByText(new RegExp(expected)).last().waitFor();
    }
    await page.getByRole('button', { name: 'GET recargar', exact: true }).click();
    await page.getByText('Neon Waves', { exact: true }).waitFor(); await page.getByText('Midnight Session', { exact: true }).waitFor();
    assert.deepEqual(new Set(requests), new Set(['GET /dev/events','POST /dev/events','PUT /dev/events/EVT-101','PATCH /dev/events/EVT-101','DELETE /dev/events/EVT-102']));
    assert.deepEqual(errors, []);
    await page.setViewportSize({ width: 390, height: 844 }); await page.screenshot({ path: path.join(root, 'test-results/cliente-e2e.png'), fullPage: true });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await new Promise(resolve => api.close(resolve));
    await page.getByRole('button', { name: 'GET recargar', exact: true }).click(); await page.getByRole('alert').waitFor();
    console.log('Cliente exportado: cinco métodos reales, JSON visible, CORS, red caída y diseño móvil comprobados contra handlers compilados (harness HTTP; no AWS ni Offline).');
  } finally {
    fs.writeFileSync(apiPath, original);
    if (browser) await browser.close(); if (web) await new Promise(resolve => web.close(resolve)); if (api.listening) await new Promise(resolve => api.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
