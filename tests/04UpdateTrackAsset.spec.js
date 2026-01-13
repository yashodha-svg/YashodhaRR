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

  test('Update existing Asset', async ({page})=>{
  // Expand the Assets menu by clicking on it
    await page.locator('[data-toggle="offcanvas"][title="Menu Collapse"]').click();
    await page.getByRole('link', { name: 'Assets' }).click();

    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForURL('**/#equipments/equipments/index', { timeout: 60000 });
  

  //Select Existing Asset
    await page.getByRole('link', { name: 'REG Track3' }).first().click();
    await page.getByRole('link', { name: 'Asset Details' }).click();
    await console.log('✅ Successfully Open Assets detail page');

    const fs = require('fs');
    const path = require('path');
    // Helper to trigger file input and dispatch change event

  //Upload Image
  await page.getByText('Asset photos', { exact: true }).click();
  //const fs = require('fs');
  //const path = require('path');

const imagePath = path.join(__dirname, '..', 'Test-data', 'Railline.jpg');
if (!fs.existsSync(imagePath)) {
  throw new Error(`❌ Image file not found at path: ${imagePath}`);
}
await page.evaluate(() => {
  const input = document.querySelector('input.asset_photo_file_action');
  if (input) input.click();
});
await page.setInputFiles('input.asset_photo_file_action', imagePath);
// Manually dispatch 'change' event to trigger frontend logic
await page.evaluate(() => {
  const input = document.querySelector('input.asset_photo_file_action');
  if (input) {
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  }
});
// Fill Image details
  await page.locator('#asset_files_form input[name="update_asset_images_title[]"]').click();
  await page.locator('#asset_files_form input[name="update_asset_images_title[]"]').fill('Image1');
  await page.locator('#asset_files_form textarea[name="update_asset_images_desc[]"]').click();
  await page.locator('#asset_files_form textarea[name="update_asset_images_desc[]"]').fill('TestReg');
// Click Save button
  //await page.locator('div.asset_file_submit_div > input').click();
  await page.locator('input.asset_files_submit').click();
  await page.waitForLoadState('networkidle');
  console.log('✅ Image upload sucessfull');
  // Close the image upload popup
await page.locator('#close-asset-photo-popup').click();
await page.waitForTimeout(500); // Optional: small delay to ensure modal closes

 //Add file
 await page.getByText('Asset files', { exact: true }).click();
  // Prepare file path
const filePath = path.join(__dirname, '..', 'Test-data', 'sample3.pdf');
if (!fs.existsSync(filePath)) {
  throw new Error(`❌ file not found at path: ${filePath}`);
}
//Trigger the file input via JS click (bypassing visibility)
await page.evaluate(() => {
  const input2 = document.querySelector('input.asset_photo_file_action');
  if (input2) input2.click();
});
// Upload the file
await page.setInputFiles('input.asset_photo_file_action', filePath);
// Manually dispatch 'change' event to trigger frontend logic
await page.evaluate(() => {
  const input2 = document.querySelector('input.asset_photo_file_action');
  if (input2) {
    const event2 = new Event('change', { bubbles: true });
    input2.dispatchEvent(event2);
  }
});
// Fill File details
  await page.locator('#asset_files_form input[name="update_asset_files_name[]"]').click();
  await page.locator('#asset_files_form input[name="update_asset_files_name[]"]').fill('FileTest1');

// Click Save button
  //await page.locator('div.asset_file_submit_div > input').click();
  await page.locator('input.asset_files_submit').click();
  await page.waitForLoadState('networkidle');
  console.log('✅ File upload sucessfull');

  //Delete uploaded Image
  /*await page.getByRole('cell', { name: 'FileTest4' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('dialog', { name: 'Are you sure you want to' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();*/
  //Close the file upload popup
  await page.locator('#close-asset-photo-popup').click();
  await page.waitForTimeout(500); 

  //Update asset details
  await page.getByText('Asset details', { exact: true }).click();
  await page.locator('#form_element_941').click();
  await page.locator('#form_element_941').fill('RegresionTest1');
  await page.getByRole('button', { name: 'Update' }).click();
   console.log('✅ Asset Update Sucessfully');
});
     

