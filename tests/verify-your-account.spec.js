import { test, expect } from '@playwright/test';

test.describe('Verify Your Account', () => {

    test.beforeEach(async ({ page }) => {
        // Acessa a página do app de verificação de conta
        await page.goto('https://qaplayground.dev/apps/verify-account/');
    });

    test('teste de carregamento de tela', async ({ page }) => {
        // Valida se o título principal está visível
        await expect(page.getByRole('heading', { name: 'Verify Your Account' })).toBeVisible();
        
        // Valida se a instrução está visível
        await expect(page.getByText('We emailed you the six digit code')).toBeVisible();

        // Valida que os 6 campos de input de código estão visíveis na página
        const inputs = page.locator('input.code');
        await expect(inputs).toHaveCount(6);
        for (let i = 0; i < 6; i++) {
            await expect(inputs.nth(i)).toBeVisible();
        }
    });

    test('capturando os numeros no campo e imputando corretamente', async ({ page }) => {
        // Localiza o elemento que contém o código de confirmação
        const infoElement = page.locator('small.info');
        await expect(infoElement).toBeVisible();
        
        // Extrai o código da página
        const rawText = await infoElement.textContent();
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';
        expect(confirmationCode).toHaveLength(6);

        // Localiza o primeiro input, foca nele e digita o código correto
        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(confirmationCode);

        // Valida a exibição da mensagem de "Success"
        await expect(page.getByText('Success')).toBeVisible();
    });

    test('colocando numero aleatorio', async ({ page }) => {
        // Obtém o código real para garantir que o aleatório seja diferente
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        const actualCode = rawText.match(/\d/g)?.join('') || '';

        // Gera um código de 6 dígitos diferente do real
        let randomCode = '';
        do {
            randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        } while (randomCode === actualCode);

        // Localiza os inputs e digita o código aleatório
        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(randomCode);

        // Valida que a mensagem de "Success" não é exibida
        await expect(page.getByText('Success')).not.toBeVisible();
    });

    test('teste de confirmação sem imputar todos os numeros', async ({ page }) => {
        // Obtém o código real
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';

        // Pega apenas os 3 primeiros dígitos do código correto
        const partialCode = confirmationCode.substring(0, 3);

        // Digita apenas o código parcial
        const inputs = page.locator('input.code');
        await inputs.first().click();
        await page.keyboard.type(partialCode);

        // Valida que a mensagem de "Success" não é exibida
        await expect(page.getByText('Success')).not.toBeVisible();
    });

});
