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

    test('verify your account', async ({page}) => {
        await page.goto('https://qaplayground.dev/apps/verify-account/');
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';
        
        await page.getByPlaceholder('0').first().fill(confirmationCode[0])
        await page.keyboard.press('Tab');
        
        for(let i = 1;i < 6 ;i++){
            await page.keyboard.type(confirmationCode[i]);
            await page.waitForTimeout(1000);
            console.log(i)
        }
        await page.waitForLoadState('networkidle'); 
        await expect(page.getByText('Success')).toBeVisible();
    });     

    test('tags input box' , async ({page}) => {
        await page.goto('https://qaplayground.dev/apps/tags-input-box/'); 
        await page.getByRole('button', { name: 'Remove All' }).click();
        await page.getByRole('textbox').fill("validação")
        await page.getByRole('textbox').press('Enter');
        await expect(page.getByText('validação')).toBeVisible(); 
        await page.getByRole('textbox').fill("input de texto")
        await page.getByRole('textbox').press('Enter');
        await expect(page.getByText('input de texto')).toBeVisible(); 
    })
})