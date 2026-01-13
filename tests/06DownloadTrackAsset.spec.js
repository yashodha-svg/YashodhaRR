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

  test('Download existing Asset', async ({page})=>{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();

    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
  

  //Select Existing Asset
    await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('link', { name: 'Asset Details' }).click();
    await console.log('✅ Successfully Open Assets detail page');

    //Select Download Asset Excel
    await page.getByRole('button', { name: 'Manage ' }).click();
    await page.getByRole('button', { name: 'Download Information' }).click();
    await page.getByRole('radio', { name: 'MS Excel' }).check();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await console.log('✅ Successfully Download Assets detail in Excel');

    //Select Download Asset PDF
    //await page.getByRole('button', { name: 'Manage ' }).click();
    //await page.getByRole('button', { name: 'Download Information' }).click();
    await page.getByRole('radio', { name: 'PDF' }).check();
    const downloadPromise1 = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download1= await downloadPromise1;
    await console.log('✅ Successfully Download Assets detail in PDF');

    //Select Download Asset Photos
   // await page.getByRole('button', { name: 'Manage ' }).click();
    //await page.getByRole('button', { name: 'Download Information' }).click();
    await page.getByRole('radio', { name: 'Asset photos and files' }).check();
    const downloadPromise2 = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download2= await downloadPromise2;
    await page.getByRole('button', { name: '' }).click();
    await console.log('✅ Successfully Download Assets detail in Photos');

});
     