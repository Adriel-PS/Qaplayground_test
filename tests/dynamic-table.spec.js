import { test, expect } from '@playwright/test';

test.describe('Validação da Tabela Dinâmica', () => {

    test.beforeEach(async ({ page }) => {
        // Acessa diretamente a página do app da tabela dinâmica
        await page.goto('https://qaplayground.dev/apps/dynamic-table/');
    });

    test('validar carregamento da pagina', async ({ page }) => {
        // Valida que o container da tabela e o cabeçalho estão visíveis
        await expect(page.locator('table')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'QA Playground' })).toBeVisible();
    });

    test('carregar a lista', async ({ page }) => {
        // Aguarda que as linhas da tabela sejam preenchidas dinamicamente
        const rows = page.locator('#tbody tr');
        await expect(rows).toHaveCount(8);
    });

    test('validar nomes apresentados', async ({ page }) => {
        // Lista de heróis esperados e seus nomes reais de acordo com a base db1.json
        const expectedHeroes = [
            { name: 'Spider-Man', realName: 'Peter Parker' },
            { name: 'Captain America', realName: 'Steve Rogers' },
            { name: 'Hulk', realName: 'Robert Bruce Banner' },
            { name: 'Iron Man', realName: "Anthony 'Tony' Stark" },
            { name: 'Ant-Man', realName: "Eric O'Grady" },
            { name: 'Deadpool', realName: 'Wade Wilson' },
            { name: 'Doctor Strange', realName: 'Stephen Vincent Strange' },
            { name: 'Black Widow', realName: 'Natasha Alianovna Romanova' }
        ];

        const rows = page.locator('#tbody tr');
        const count = await rows.count();

        // Itera sobre as linhas exibidas para validar as informações
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            
            // Obtém o nome exibido na linha
            const nameText = await row.locator('div.text-sm.font-medium').first().textContent();
            const cleanName = nameText?.trim();

            // Encontra o herói correspondente na nossa lista esperada
            const expectedHero = expectedHeroes.find(h => h.name === cleanName);
            expect(expectedHero).toBeDefined();

            // Valida se o nome real exibido na linha corresponde ao esperado
            const realNameText = await row.locator('td').nth(2).locator('span').textContent();
            expect(realNameText?.trim()).toBe(expectedHero.realName);
        }
    });

    test('validar se as img foram carregadas', async ({ page }) => {
        const rows = page.locator('#tbody tr');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const img = rows.nth(i).locator('img');
            
            // Valida se o elemento img está visível
            await expect(img).toBeVisible();
            
            // Valida se o atributo src está preenchido e aponta para a pasta img
            const src = await img.getAttribute('src');
            expect(src).not.toBeNull();
            expect(src).toMatch(/^\.\/img\/.*\.(jpg|png|svg)$/);

            // Valida se a imagem foi carregada com sucesso verificando sua largura natural (naturalWidth > 0)
            const isLoaded = await img.evaluate((image) => {
                return image.complete && image.naturalWidth > 0;
            });
            expect(isLoaded).toBe(true);
        }
    });

});
