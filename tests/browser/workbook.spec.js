const { test, expect } = require('@playwright/test');

test('ruta directa, archivos copiables y modo maximizado', async ({ page, context }, info) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#primer-serverless/destino');
  await expect(page.getByRole('heading', { name: 'Tu primera función Serverless', exact: true })).toBeVisible();
  await expect(page.locator('.phase-nav button')).toHaveCount(8);
  await page.screenshot({ path: `test-results/destino-${info.project.name}.png`, fullPage: true });
  await page.locator('[data-phase="construye"]').click();
  const panel = page.locator('.file-lab');
  await panel.locator('[data-max]').click();
  await panel.getByRole('tab', { name: '3 · hello.ts' }).click();
  await expect(panel).toHaveClass(/maximized/);
  await expect(panel.locator('.file-location')).toContainText('backend/src/hello.ts');
  await panel.getByRole('button', { name: 'Copiar archivo', exact: true }).click();
  await expect(panel.getByRole('button', { name: '✓ Copiado' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('export const handler');
  await panel.getByRole('tab', { name: '3 · hello.ts' }).focus();
  await page.keyboard.press('Home');
  await expect(panel.getByRole('tab', { name: '1 · tsconfig.json' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(panel.getByRole('tab', { name: '2 · serverless.yml' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(panel.getByRole('tab', { name: '3 · hello.ts' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Escape');
  await expect(panel).not.toHaveClass(/maximized/);
  await page.screenshot({ path: `test-results/archivos-${info.project.name}.png`, fullPage: true });
  await page.reload();
  await expect(panel.getByRole('tab', { name: '3 · hello.ts' })).toHaveAttribute('aria-selected', 'true');
  expect(page.url()).toContain('#primer-serverless/construye');
});

test('checkpoints y diagnóstico se conservan al navegar y recargar', async ({ page }) => {
  await page.goto('/#primer-serverless/prepara');
  const checks = page.locator('input[data-check]');
  await checks.first().check();
  await page.locator('[data-wizard]').nth(1).click();
  await expect(checks.first()).toBeChecked();
  await page.reload();
  await expect(checks.first()).toBeChecked();
  await expect(page.locator('[data-wizard]').nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.getByText('DIAGNOSTICA · si no coincide', { exact: true }).click();
  await expect(page.getByText('npm no responde', { exact: true })).toBeVisible();
  await page.locator('[data-phase="destino"]').click();
  await page.goBack();
  await expect(page.locator('.phase-heading h2')).toHaveText('Prepara backend desde cero');
  await expect(checks.first()).toBeChecked();
});

test('preguntas formativas: error explicado, reintento y respuesta guardada', async ({ page }) => {
  await page.goto('/#primer-serverless/comprueba');
  const first = page.locator('.quiz').first();
  await first.locator('[data-answer="0"]').click();
  await expect(first.getByRole('status')).toContainText('Revisa la explicación');
  await expect(page.locator('[data-phase-complete]')).toBeDisabled();
  await first.locator('[data-answer="1"]').click();
  await expect(first.getByRole('status')).toContainText('Correcto');
  await page.reload();
  await expect(first.locator('[data-answer="1"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.quiz').nth(1).locator('[data-answer="2"]').click();
  await page.locator('.quiz').nth(2).locator('[data-answer="0"]').click();
  await expect(page.locator('[data-phase-complete]')).toBeEnabled();
});

test('recorrido completo registra un bloque y revoca una comprobación retirada', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#primer-serverless/destino');
  await expect(page.locator('#progress-text')).toHaveText('0/10 bloques');
  const phases = ['destino', 'prepara', 'construye', 'prueba', 'entiende', 'modifica', 'comprueba', 'cierra'];
  for (const id of phases) {
    await expect(page).toHaveURL(new RegExp('#primer-serverless/' + id + '$'));
    const wizards = await page.locator('[data-wizard]').evaluateAll(elements => [...new Set(elements.map(element => element.dataset.wizard))]);
    for (const key of wizards) {
      const tabs = page.locator(`[data-wizard="${key}"]`);
      const count = await tabs.count();
      for (let i = 0; i < count; i++) {
        await tabs.nth(i).click();
        await page.locator(`[data-next="${key}"]`).click();
      }
    }
    const checks = page.locator('input[data-check]');
    for (let i = 0; i < await checks.count(); i++) await checks.nth(i).check();
    if (id === 'comprueba') for (const [i, answer] of [1, 2, 0].entries()) await page.locator('.quiz').nth(i).locator(`[data-answer="${answer}"]`).click();
    await expect(page.locator('[data-phase-complete]')).toBeEnabled();
    await page.locator('[data-phase-complete]').click();
  }
  await expect(page.locator('#completion-message')).toContainText('Bloque 01 completado');
  await expect(page.locator('#progress-text')).toHaveText('1/10 bloques');
  await page.reload();
  await expect(page.locator('#progress-text')).toHaveText('1/10 bloques');
  await expect(page.locator('.lesson-meta')).toContainText('8 / 8 fases completadas');
  await page.locator('input[data-check]').first().uncheck();
  await expect(page.locator('#progress-text')).toHaveText('0/10 bloques');
  await expect(page.locator('#completion-message')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('el avance antiguo no produce 100 % y las casillas antiguas también se guardan', async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('fcState')) localStorage.setItem('fcState', JSON.stringify({ lesson: 'preparacion', done: Object.fromEntries(Array.from({ length: 20 }, (_, i) => ['paso-' + i, true])) }));
  });
  await page.goto('/#preparacion');
  await expect(page.locator('#progress-text')).toHaveText('0/10 bloques');
  const check = page.locator('input[data-check]').first();
  await check.check();
  await page.locator('[data-tab]').first().click();
  await expect(check).toBeChecked();
  await page.reload();
  await expect(check).toBeChecked();
  await page.locator('[data-legacy-complete]').click();
  await expect(page.locator('#progress-text')).toHaveText('1/10 bloques');
});

test('todos los bloques siguen accesibles y el entrenamiento conserva su maqueta', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#primer-serverless/destino');
  const lessons = ['preparacion', 'get', 'post', 'crud', 'react-native', 'rn-get', 'rn-crud', 'aws', 'cloud', 'training'];
  for (const id of lessons) {
    if (await page.locator('#menu-btn').isVisible()) await page.locator('#menu-btn').click();
    await page.locator(`[data-lesson="${id}"]`).click();
    await expect(page.locator('#content h1')).toBeVisible();
    await expect(page.locator('#study-footer')).toBeVisible();
  }
  await page.locator('[data-screen="detail"]').click();
  await expect(page.locator('.phone-screen')).toContainText('GARDEN');
  await page.locator('[data-screen="new"]').click();
  await expect(page.locator('.phone-screen')).toContainText('CREAR ESPACIO');
  expect(errors).toEqual([]);
});

test('las ocho fases se leen sin desbordamiento a 320, 390 y 1440 px', async ({ page }) => {
  await page.goto('/#primer-serverless/destino');
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const phase of ['destino', 'prepara', 'construye', 'prueba', 'entiende', 'modifica', 'comprueba', 'cierra']) {
      await page.locator(`[data-phase="${phase}"]`).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), phase + ' a ' + width).toBe(true);
    }
  }
});

test('el reinicio exige confirmación y un estado dañado no deja la pantalla vacía', async ({ page }) => {
  await page.addInitScript(() => { if (!localStorage.getItem('fcState')) localStorage.setItem('fcState', '{roto'); });
  await page.goto('/#primer-serverless/comprueba');
  await expect(page.locator('.quiz')).toHaveCount(3);
  await page.locator('.quiz').first().locator('[data-answer="1"]').click();
  page.once('dialog', dialog => dialog.dismiss());
  if (await page.locator('#menu-btn').isVisible()) await page.locator('#menu-btn').click();
  await page.locator('#reset-progress').click();
  expect(await page.evaluate(() => Object.keys(state.quizzes).length)).toBe(1);
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#reset-progress').click();
  await expect(page).toHaveURL(/#primer-serverless\/destino$/);
  expect(await page.evaluate(() => Object.keys(state.quizzes).length)).toBe(0);
});


test('la revisión TypeScript requiere comprobar sus fases y conserva los registros antiguos', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('fcState', JSON.stringify({
      lesson: 'primer-serverless', completedLessons: { 'primer-serverless': true },
      phaseDone: Object.fromEntries(['destino','prepara','construye','prueba','entiende','modifica','comprueba','cierra'].map(id=>['primer-serverless/'+id,true])),
      checks: { 'primer-serverless/archivos-listos/0': true }
    }));
  });
  await page.goto('/#primer-serverless/destino');
  await expect(page.locator('#progress-text')).toHaveText('0/10 bloques');
  await expect(page.locator('.lesson-meta')).toContainText('0 / 8 fases completadas');
  expect(await page.evaluate(()=>state.checks['primer-serverless/archivos-listos/0'])).toBe(true);
});
