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

  test('View Segment History', async ({page})=>{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
  

  //Select Existing Asset
    await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('link', { name: 'Asset Details' }).click();
    await console.log('✅ Successfully Open Assets detail page');

    //Select Segment History
    await page.getByTitle('Show/Hide Segment History').click();
    await console.log('✅ Successfully Expand the Segment History');
    await page.getByText('Hide Segments History').click();
    await console.log('✅ Successfully Collapse the Segment History');


});
  /**await page.goto('https://railroadsoftware.io/staging/trackAsset/client/user/login/entry');
  await page.getByRole('textbox', { name: '' }).click();
  await page.getByRole('textbox', { name: '' }).fill('ussugar@railroadsoftware.com');
  await page.getByRole('textbox', { name: '' }).click();
  await page.getByRole('textbox', { name: '' }).fill('(38&$n32b&21nD');
  await page.getByRole('textbox', { name: '' }).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: ' All Assets' }).click();
  await page.getByRole('link', { name: 'REG Track2' }).click();
  await page.getByRole('link', { name: 'Asset Details' }).click();
  await page.getByTitle('Show/Hide Segment History').click();
  await page.getByText('Hide Segments History').click();**/