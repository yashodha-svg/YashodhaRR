const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test('Invalid Login', async ({page})=>
 {
    
    await page.goto("https://railroadsoftware.io/staging/trackAsset/client/user/login/entry");
    console.log (await page.title());
    await page.locator('#login_name').fill("ussugar@ra.com");
    await page.locator('#passwd').fill("P23#Ns7oW@");
    await page.locator('#loginBtn').click();
    console.log(await page.locator('#err_msg_cnt').textContent());
    await expect(page.locator('#err_msg_cnt')).toContainText('wrong email');
 });

     

