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

  test('Edit Forms', async ({page})=>{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
  
  //Select Existing Asset
    await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('link', { name: 'Asset Details' }).click();
    await console.log('✅ Successfully Open Assets detail page');

    //Select Edit Form
    await page.getByRole('button', { name: ' Edit Forms' }).click();
// Open dropdown
await page.locator('#bulk_forms_select_chosen').click();

// Type to filter
await page.locator('#bulk_forms_select_chosen input').fill('Annual Cycle(1234)');

// Debug: log available options
console.log(await page.locator('.chosen-results li').allTextContents());

// Click the option if present
await page.getByText('Annual Cycle(1234)', { exact: true }).click();

// Assert selection
await expect(page.locator('#bulk_forms_select_chosen .chosen-choices li.search-choice')).toContainText('Annual Cycle(1234)');




    await page.getByRole('button', { name: 'Apply' }).click();
    await page.locator('input[name="no_ins_week_details_12669_3239"]').click();
    await page.getByRole('row', { name: 'Seg4 Update Annual Cycle(1234' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await console.log('✅ Successfully Edit form');
})

/**await page.getByRole('button', { name: ' Edit Forms' }).click();
  await page.getByRole('list').filter({ hasText: /^$/ }).nth(3).click();
  await page.locator('#bulk_forms_select_chosen').getByText('Annual Cycle(1234)').click();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.locator('input[name="no_ins_week_details_12669_3239"]').click();
  await page.getByRole('row', { name: 'Seg4 Update Annual Cycle(1234' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: 'Seg4 Update Annual Cycle(1234' }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'OK' }).click();**/

//*[@id="bulk_forms_select_chosen"]/ul/li[1]/span