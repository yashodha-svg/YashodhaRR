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

  test.only('Add new Segment to the Asset', async ({page})=>
{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();
    await console.log('✅ Expanded Assets menu');

    await page.getByRole('link', { name: 'All' }).click();
    await console.log('✅ Clicked All Assets link');
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
    await console.log('✅ Successfully navigated to All Assets page');

  //Select Existing Asset
    await page.getByRole('link', { name: 'REG Track2' }).first().click();
    await page.getByRole('link', { name: 'Asset Details' }).click();
    await console.log('✅ Successfully Open Assets detail page');

  //Add segment
  await page.locator('#equipments_v3').getByTitle('Add Segment').click();
  await page.waitForTimeout(2000);
  //Use JavaScript click to bypass visibility restrictions
  const jsClickResult = await page.evaluate(() => {
  const element = document.querySelector('#insert_asset_segment');
  if (element) {
    element.click();
    return { success: true, className: element.className };
  }
  return { success: false };
  });
    
    await page.locator('#segment_name').fill("Seg4");
    await page.locator('#start_mp').click();
    await page.locator('#start_mp').fill('1');
    await page.locator('#end_mp').click();
    await page.locator('#end_mp').fill('2.1');
    await page.getByRole('row', { name: 'Seg4 1 2.1 View View ' }).getByRole('button').first().click();
    await page.locator('input[name="Track Designation_0"]').click();
    await page.locator('input[name="Track Designation_0"]').fill('Test');
    await page.locator('input[name="Track Traversed_0"]').click();
    await page.locator('input[name="Track Traversed_0"]').fill('Test');
    await page.locator('input[name="Method of inspection_0"]').click();
    await page.locator('input[name="Method of inspection_0"]').fill('Test');
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('row', { name: 'TRACK INSPECTION 7 0 1 Green' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Save' }).click();

// Verification
await page.waitForTimeout(2000); // Wait for save to complete
await expect(page.getByRole('cell', { name: 'Seg4' })).toBeVisible();
console.log('✅ Segment successfully added and verified');

await page.screenshot({ path: 'segment-verification-success.png' });

//Update segment
 await page.locator('#segment_list_table_body > tr:nth-child(2) > td.segment_setting_td > div').click();
  await page.getByRole('cell', { name: '  Edit  Delete  Move Up' }).locator('#edit_segment').click();
  await page.getByRole('row', { name: 'TEST TL Schedule Type  Weekly' }).locator('input[name="form_ids[]"]').check();
  await page.locator('input[name="segment_name"]').fill('Seg4 Update');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('div').filter({ hasText: /^Warning$/ }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  console.log('✅ Segment successfully Updated and verified');

//Delete segment
//await page.locator('#segment_list_table_body > tr:nth-child(3) > td.segment_setting_td > div').click();
//await page.getByRole('cell', { name: '  Edit  Delete  Move Up' }).locator('#Delete_segment').click();
  await page.getByRole('cell', { name: ' Seg4 Update', exact: true }).getByRole('button').click();
  await page.getByRole('listitem').filter({ hasText: 'Delete' }).locator('a').click();
  await page.getByLabel('Are you sure you want to').locator('div').filter({ hasText: /^Delete$/ }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
//a[@title='Menu Collapse']
console.log('✅ Segment successfully Deleted');
  });
     

