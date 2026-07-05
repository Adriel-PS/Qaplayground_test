import { test, expect } from '@playwright/test';

test.describe('Verify Your Account', () => {

    test.beforeEach(async ({ page }) => {
        // Acessa a página do app de verificação de conta
        await page.goto('https://qaplayground.dev/apps/verify-account/');
    });

    test('teste de carregamento de tela', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Verify Your Account' })).toBeVisible();
        
        await expect(page.getByText('We emailed you the six digit code')).toBeVisible();

        const inputs = page.locator('input.code');
        await expect(inputs).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(inputs.nth(i)).toBeVisible();
        }
    });

    test('capturando os numeros no campo e imputando corretamente', async ({ page }) => {
        const infoElement = page.locator('small.info');
        await expect(infoElement).toBeVisible();
        
        const rawText = await infoElement.textContent();
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';
        expect(confirmationCode).toHaveLength(6);

        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(confirmationCode);

        await expect(page.getByText('Success')).toBeVisible();
    });

    test('colocando numero aleatorio', async ({ page }) => {
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        const actualCode = rawText.match(/\d/g)?.join('') || '';

        let randomCode = '';
        do {
            randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        } while (randomCode === actualCode);

        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(randomCode);

        await expect(page.getByText('Success')).not.toBeVisible();
    });

    test('teste de confirmação sem imputar todos os numeros', async ({ page }) => {
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';

        const partialCode = confirmationCode.substring(0, 3);

        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(partialCode);

        await expect(page.getByText('Success')).not.toBeVisible();
    });

});
