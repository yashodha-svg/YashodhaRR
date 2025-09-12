const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

/**test('Invalid Login shows error message', async ({page})=>
 {
    
    await page.goto("https://railroadsoftware.io/staging/trackAsset/client/user/login/entry");
    console.log (await page.title());
    await page.locator('#login_name').fill("ussugar@ra.com");
    await page.locator('#passwd').fill("P23#Ns7oW@");
    await page.locator('#loginBtn').click();
    console.log(await page.locator('#err_msg_cnt').textContent());
    await expect(page.locator('#err_msg_cnt')).toContainText('wrong email');
 });
**/
test.beforeEach('Successful Login', async ({page})=>
 {
    
    await page.goto("https://railroadsoftware.io/staging/trackAsset/client/user/login/entry");
    console.log (await page.title());
    await page.locator('#login_name').fill("ussugar@railroadsoftware.com");
    await page.locator('#passwd').fill("F9V8xVr3!");
    await page.locator('#loginBtn').click();  
    await page.waitForURL('**/#dashboard/dashboardoverview/index',{ timeout: 60000 });
    await console.log('✅ Login successful and dashboard loaded');
    });

  test('Add new Track Asset', async ({page})=>
  {
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();
    await console.log('✅ Expanded Assets menu');
  // Click on the All Assets link
    await page.getByRole('link', { name: 'All' }).click();
    await console.log('✅ Clicked All Assets link');
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
    await console.log('✅ Successfully navigated to All Assets page');
  //Navigate to Crete new Asset page
   await page.getByRole('button', { name: 'Manage' }).click();
   await page.locator('#add_list2_top', { hasText: 'New Asset' }).click();
   await console.log('✅ Open Add Asset page successfully');
  // Create new Asset
   await page.locator('#ce_company_equipment_type_id_chosen').click();
   await page.locator('#ce_company_equipment_type_id_chosen').getByText('Track').click();
   await page.locator('#ce_group_chosen > a').click();
   await page.locator('#ce_group_chosen').getByText('Bridge Inspection').click();
   await page.locator('#ce_equipment_name').click();
   await page.locator('#ce_equipment_name').fill('REG Track8');
   await page.locator('#ce_company_region_id_chosen > a').click();
   await page.locator('#ce_company_region_id_chosen').getByText('American', { exact: true }).click();
   await page.locator('#ce_company_location_id_chosen > a').click();
   await page.locator('#ce_company_location_id_chosen').getByText('INKYSLOCATION').click();
   await page.getByRole('button', { name: 'Save' }).click();
   await console.log('✅ Add new Asset successfully');
   await page.goto('https://railroadsoftware.io/staging/trackAsset/client/#miscequipments/equipments_v3/index|typeid|1TjhVCPlNorxrbQa_WxzbP7F5KMjZWHZUjcHH0fn4_o|tabelement|');

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

  //Select Add segment modal
    await page.locator('#equipments_v3').getByText('Add Segment').click();
    console.log('✅ Clicked "Add Segment" button');
  
    const addMultipleSegmentModal = page.locator('#add-multiple_segment.overlay11.assdet-pp');
    
    // Now, wait for this specific modal to be visible.
    await expect(addMultipleSegmentModal).toBeVisible();
    console.log('✅ Modal is now visible');

    // Assert that the text inside the modal is visible.
    const modalAddSegmentText = addMultipleSegmentModal.getByText('Add Segment');
    await expect(modalAddSegmentText).toBeVisible();
    console.log('✅ Verified "Add Segment" text is visible inside the modal');

    console.log('✅ Successfully opened and verified the modal');

  });
     

