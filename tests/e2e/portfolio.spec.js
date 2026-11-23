import {test,expect} from '@playwright/test';

test('presenta el nombre y la introducción', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/Ideas que se/})).toBeVisible();
  await expect(page.getByText('Erik Salvatierra Choque').first()).toBeVisible();
});

test('muestra tres proyectos del backend', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.getByRole('heading',{name:'Parqueo Fácil'})).toBeVisible();
});

test('envía un mensaje desde el formulario', async ({page}) => {
  await page.goto('/');
  await page.getByLabel('Tu nombre').fill('Ana Prueba');
  await page.getByLabel('Tu correo').fill('ana@example.com');
  await page.getByLabel('Tu mensaje').fill('Hola Erik, quisiera conversar sobre un proyecto web.');
  await page.getByRole('button',{name:'Enviar mensaje'}).click();
  await expect(page.getByRole('status')).toContainText('¡Mensaje enviado!');
});
