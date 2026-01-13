const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test.beforeEach('Successful Login', async ({page})=>
 {
    await page.goto("https://railroadsoftware.io/staging/trackAsset/client/user/login/entry");
    console.log (await page.title());
    await page.locator('#login_name').fill("ussugar@railroadsoftware.com");
    await page.locator('#passwd').fill("(38&$n32b&21nD");
    await page.locator('#loginBtn').click();  
    await page.waitForURL('**/#dashboard/dashboardoverview/index',{ timeout: 60000 });
    await console.log('✅ Login successful and dashboard loaded');
    });

  test('Delete existing Asset', async ({page})=>{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
  

  //Select Existing Asset
    //await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('button', { name: 'Manage ' }).click();
    await page.locator('#insp-tab').getByTitle('Delete', { exact: true }).click();
    //await page.getByTitle('Delete', { exact: true }).click();
    //await page.locator('#delhdlist2').click();
    await page.getByRole('cell', { name: 'Are you sure you want to' }).click();
    await page.locator('#dData').click();
  console.log('✅ Asset delete sucessfull');

});
     

