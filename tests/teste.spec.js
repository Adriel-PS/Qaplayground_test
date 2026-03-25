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
        // await page.goto('https://qaplayground.dev/');
        // await page.getByRole('link', { name: 'Mini Web Apps' }).click();
        // await page.getByRole('link', { name: 'Verify Your Account Enter' }).click();
        const infoElement = page.locator('small.info');
        const rawText = await infoElement.textContent();
        console.log(rawText)
        const confirmationCode = rawText.match(/\d/g)?.join('') || '';
        console.log(confirmationCode)
        console.log(confirmationCode[0])
        
        await page.getByPlaceholder('0').first().fill(confirmationCode[0])
        await page.keyboard.press('Tab');
        
        for(let i = 1;i < 7 ;i++){
            await page.keyboard.type(confirmationCode[i]);
            await page.waitForTimeout(1000);
            console.log(i)
        }
    
        await expect(page.getByText('Success')).toBeVisible();
    });     

})