import { test, expect } from '@playwright/test';

test.describe('Validação do site', () => {

    // test.beforeEach(async ({ page }) => {
    //     await page.goto('https://qaplayground.dev/');
    // });

    test('tabela ', async ({ page }) => {
       await page.goto('https://qaplayground.dev/');
       await page.getByRole('link', { name: 'Mini Web Apps' }).click();
       await page.getByRole('link', { name: 'Dynamic Table Find the Spider' }).click();   
       await expect(page.getByText('Hulk', {exact : true})).toBeVisible();  
    });

    test('busca da primeira linha')

});

