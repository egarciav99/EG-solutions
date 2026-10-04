import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const ROUTES = ['/', '/servicios', '/proyectos', '/como-trabajo', '/contacto'];

/** Recoge errores de JS y respuestas locales con error mientras se usa la página. */
function watch(page: Page) {
  const problems: string[] = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && /Content Security Policy|Refused to/i.test(m.text())) problems.push(m.text());
  });
  page.on('response', (r) => {
    const url = r.url();
    if (url.startsWith('http://127.0.0.1') && r.status() >= 400 && !url.includes('/_vercel/')) {
      problems.push(`HTTP ${r.status()} ${url}`);
    }
  });
  return problems;
}

for (const route of ROUTES) {
  test.describe(route, () => {
    test('carga sin errores y con un h1', async ({ page }) => {
      const problems = watch(page);
      await page.goto(route);
      await expect(page.locator('h1').first()).toBeVisible();
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    test('no hay scroll horizontal', async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test('las imágenes locales cargan', async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const broken = await page.$$eval('img', (imgs) =>
        imgs
          .filter((i) => i.src.startsWith(location.origin) && i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      );
      expect(broken).toEqual([]);
    });
  });
}

test('una ruta desconocida muestra la página 404', async ({ page }) => {
  await page.goto('/esta-ruta-no-existe');
  await expect(page.getByRole('heading', { name: 'Esta página no existe' })).toBeVisible();
});

test('el formulario de contacto envía la consulta y confirma', async ({ page }) => {
  let body: Record<string, unknown> | undefined;
  await page.route('**/api/lead', async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/contacto');
  await page.locator('#contact-name').fill('Prueba Playwright');
  await page.locator('#contact-email').fill('prueba@example.com');
  await page.locator('#contact-details').fill('Mensaje de prueba automatizada para comprobar el formulario.');
  await page.locator('#contact-consent').check();
  await page.locator('#submit-inquiry-btn').click();
  await expect(page.getByText('Mensaje recibido correctamente')).toBeVisible();
  expect(body).toMatchObject({ name: 'Prueba Playwright', email: 'prueba@example.com', website: '' });
});

test('si el envío falla, se avisa y no se confirma', async ({ page }) => {
  await page.route('**/api/lead', (route) => route.fulfill({ status: 500, body: '{}' }));
  await page.goto('/contacto');
  await page.locator('#contact-name').fill('Prueba Playwright');
  await page.locator('#contact-email').fill('prueba@example.com');
  await page.locator('#contact-details').fill('Mensaje de prueba automatizada para comprobar el formulario.');
  await page.locator('#contact-consent').check();
  await page.locator('#submit-inquiry-btn').click();
  await expect(page.getByText('Mensaje recibido correctamente')).toHaveCount(0);
  await expect(page.locator('#direct-contact-form')).toBeVisible();
});
