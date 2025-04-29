// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Define a test case for Amazon login
test('Login to Amazon.in', async ({ page }) => {
  // Navigate to Amazon India website
  await page.goto('https://www.amazon.in/');

  // Hover over account menu (activates the dropdown)
  await page.hover('#nav-link-accountList');
  
  // Click on the account list to open sign in page
  await page.click('#nav-link-accountList');

  // Find email input field by its name attribute and fill it with value from .env file
  // The || '' adds empty string fallback if EMAIL env var is undefined
  await page.locator('input[name="email"]').fill(process.env.EMAIL || '');

   // Click continue button using XPath selector
  // Using multiple selector options - CSS selectors and XPath
  const continueButtonXPath = page.locator('xpath=//input[@class="a-button-input" and @type="submit" and @aria-labelledby="continue-announce"]');
  const continueButtonCSS = page.locator('#continue, .a-button-input[type="submit"]');
  await continueButtonXPath.click();

  // Find password input field by its name attribute and fill it with value from .env file
  // The || '' adds empty string fallback if PASSWORD env var is undefined
  await page.locator('input[name="password"]').fill(process.env.PASSWORD || '');

  // Click sign-in button - trying multiple possible selectors
  const signInButton = page.locator('#signInSubmit, input[type="submit"], .a-button-input').first();
  await signInButton.click();

  // Verify login was successful by checking if "Hello" text is visible
  // This text appears in the header when logged in
  await expect(page.getByText('Hello')).toBeVisible();
});


// A more secure approach using environment variables properly
// test('Login securely using env variables', async ({ page }) => {
  // Check if environment variables are set
//   if (!process.env.EMAIL || !process.env.PASSWORD) {
//     test.skip();
//     console.log('Environment variables EMAIL and PASSWORD must be set');
//     return;
//   }
  
//   await page.goto('https://www.amazon.in/');
  
//   await page.hover('#nav-link-accountList');
//   await page.click('#nav-link-accountList');
  
//   await page.locator('input[name="email"]').fill(process.env.EMAIL);
//   await page.click('input#continue');
  
//   await page.locator('input[name="password"]').fill(process.env.PASSWORD);
//   await page.click('input#signInSubmit');
  
//   await expect(page.getByText('Hello')).toBeVisible();
// });
