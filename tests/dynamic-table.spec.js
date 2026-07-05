import { test, expect } from '@playwright/test';

test.describe('Validação da Tabela Dinâmica', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qaplayground.dev/apps/dynamic-table/');
    });

    test('validar carregamento da pagina', async ({ page }) => {
        await expect(page.locator('table')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'QA Playground' })).toBeVisible();
    });

    test('carregar a lista', async ({ page }) => {
        const rows = page.locator('#tbody tr');
        await expect(rows).toHaveCount(8);
    });

    test('validar nomes apresentados', async ({ page }) => {
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

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            const nameText = await row.locator('div.text-sm.font-medium').first().textContent();
            const cleanName = nameText?.trim();

            const expectedHero = expectedHeroes.find(h => h.name === cleanName);
            expect(expectedHero).toBeDefined();

            const realNameText = await row.locator('td').nth(2).locator('span').textContent();
            expect(realNameText?.trim()).toBe(expectedHero.realName);
        }
    });

    test('validar se as img foram carregadas', async ({ page }) => {
        const rows = page.locator('#tbody tr');
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const img = rows.nth(i).locator('img');
            
            await expect(img).toBeVisible();
            
            const src = await img.getAttribute('src');
            expect(src).not.toBeNull();
            expect(src).toMatch(/^\.\/img\/.*\.(jpg|png|svg)$/);

            const isLoaded = await img.evaluate((image) => {
                return image.complete && image.naturalWidth > 0;
            });
            expect(isLoaded).toBe(true);
        }
    });

});
