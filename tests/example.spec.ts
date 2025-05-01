import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';


// Load environment variables from .env file into process.env
dotenv.config();

// Take screenshot only when a test fails #// This is a good practice to take screenshots when a test fails
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    // Create screenshots directory if it doesn't exist
    const fs = require('fs');
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    // Get browser name from project name
    const browserName = testInfo.project.name;
    
    // Take screenshot with test name, browser name, and date in filename
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `screenshots/${testInfo.title.replace(/\s+/g, '-')}-${browserName}-${date}-failure.png`,
      fullPage: true 
    });
    console.log(`Test failed in ${browserName}. Screenshot saved to screenshots/${testInfo.title.replace(/\s+/g, '-')}-${browserName}-${date}-failure.png`);
  }
});

// Helper function to bypass Amazon captcha
async function bypassAmazonCaptcha(page: Page) {
  // Navigate to Amazon India website
  await page.goto('https://www.amazon.in/');
  
  // Wait a short time for initial load
  await page.waitForTimeout(1000);
  
  // Refresh the page immediately to bypass captcha detection
  await page.reload({ waitUntil: 'domcontentloaded' });
  
  // Wait a brief moment to stabilize page after reload
  await page.waitForTimeout(2000);
  
  console.log('Applied refresh strategy to bypass captcha');
}

// Define a test case for Amazon login
test('Login to Amazon.in', async ({ page }) => {
  // Use captcha bypass strategy
  await bypassAmazonCaptcha(page);

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



// Define a test case for dropdown selection
test('test dropdown selection', async ({ page }) => {
  // Use captcha bypass strategy
  await bypassAmazonCaptcha(page);

  // Click on the all categories button (just to make sure dropdown is closed before we start)
  await page.click('.nav-search-scope.nav-sprite');
  
  // Select "Amazon Fresh" using the select element that's actually controlling the dropdown
  // The searchDropdownBox is the actual select element that controls the dropdown
  await page.selectOption('#searchDropdownBox', 'search-alias=nowstore');
  
  // Verify the selection worked by checking the displayed text
  await expect(page.locator('.nav-search-scope')).toContainText('Amazon Fresh');

});



// Define test case for alerts
test('test alerts', async ({ page }) => {
  // Use captcha bypass strategy
  await bypassAmazonCaptcha(page);

  // Hover over account menu (activates the dropdown)
  await page.hover('#nav-link-accountList');
  
  // Click on the account list to open sign in page
  await page.click('#nav-link-accountList');

  // Enter an invalid email to trigger the alert
  await page.locator('input[name="email"]').fill('abcd');
  
  // Click continue button to submit and trigger alert
  const continueButtonXPath = page.locator('xpath=//input[@class="a-button-input" and @type="submit" and @aria-labelledby="continue-announce"]');
  await continueButtonXPath.click();
  
  // Wait for the specific error message to appear - using text content to identify the right alert
  // This is more specific than just using the class
  const invalidEmailAlert = page.locator("div[id='invalid-email-alert'] div[class='a-alert-content']");
  
  // Verify it's visible
  await expect(invalidEmailAlert).toBeVisible();
  
  // Verify the alert text contains the expected error message
  await expect(invalidEmailAlert).toContainText('Invalid email address');
  
  // Log the actual error text for debugging (optional)
  const alertText = await invalidEmailAlert.textContent();
  console.log(`Alert text: ${alertText}`);
  
  // Optional: Try to fix the error by entering a valid email format
  await page.locator('input[name="email"]').fill('test@example.com');
  await continueButtonXPath.click();
  
  // Now the login should proceed to password page or show a different error
});


test('test form', async ({ page }) => {
  // Use captcha bypass strategy

  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');

  // Fill inputs
  await page.fill('#name', 'John Doe');
  await page.fill('#inputEmail4', 'john@example.com');
  await page.fill('#inputPassword4','abcd');
  await page.fill('#company','doe company');
  await page.fill('#websitename','doe company');
  await page.selectOption("select[name='country']", 'India');
  await page.fill('#inputCity','Mumbai');
  await page.fill('#inputAddress1','123456');
  await page.fill('#inputAddress2','123456');
  await page.fill('#inputState','Maharashtra');
  await page.fill('#inputZip','123456');
  
  // Submit form
  await page.click('text=Submit');

  // Wait for confirmation message
  await page.waitForSelector('.success-msg.hidden', { state: 'visible' });

  // Assert success
  const successText = await page.locator('.success-msg.hidden').innerText();
  expect(successText).toContain('Thanks');

});


test.describe('Login Functionality @smoke', () => {
  
  let loginPage: LoginPage;

  test.beforeAll(() => {
    console.log('Global setup before all tests');
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(() => {
    console.log('🧹 Cleanup after each test');
  });

  test('Valid Login', async () => {
    await loginPage.login('admin', 'admin123');
    const welcomeText = await loginPage.getWelcomeText();
    await expect(welcomeText).toHaveText('Welcome');
    
    const logoutButton = await loginPage.isLogoutVisible();
    await expect(logoutButton).toBeVisible();
  });

  test.skip('This test is skipped for now', async () => {
    // Not implemented yet
  });

  test('Failing test example', async ({ page }) => {
    test.fail(); // Intentional failure
    await expect(page.locator('#nonexistent')).toBeVisible();
  });

  test('Example domain test', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });
});