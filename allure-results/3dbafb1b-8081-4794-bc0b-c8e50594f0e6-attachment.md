# Test info

- Name: Login Functionality @smoke >> Failing test example
- Location: D:\All Work\playwright-ts-demo\tests\pom_model.test.ts:66:9

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('#nonexistent')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('#nonexistent')

    at D:\All Work\playwright-ts-demo\tests\pom_model.test.ts:68:50
```

# Page snapshot

```yaml
- text: Swag Labs
- textbox "Username"
- textbox "Password"
- button "Login"
- heading "Accepted usernames are:" [level=4]
- text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
- heading "Password for all users:" [level=4]
- text: secret_sauce
```

# Test source

```ts
   1 | import { test, expect, Page } from '@playwright/test';
   2 | import { LoginPage } from '../pages/LoginPage';
   3 | import { HomePage } from '../pages/HomePage';
   4 | import { FeedbackPage } from '../pages/FeedbackPage';
   5 | import { YourInformation } from '../pages/YourInformation';
   6 |
   7 | // Take screenshot only when a test fails #// This is a good practice to take screenshots when a test fails 
   8 | // #This approach is called as "After Hook" & topic is called as "Hooks"
   9 | test.afterEach(async ({ page }, testInfo) => {
  10 |     if (testInfo.status !== 'passed') {
  11 |       // Create screenshots directory if it doesn't exist
  12 |       const fs = require('fs');
  13 |       if (!fs.existsSync('screenshots')) {
  14 |         fs.mkdirSync('screenshots');
  15 |       }
  16 |   
  17 |       // Get browser name from project name
  18 |       const browserName = testInfo.project.name;
  19 |       
  20 |       // Take screenshot with test name, browser name, and date in filename
  21 |       const date = new Date().toISOString().replace(/[:.]/g, '-');
  22 |       await page.screenshot({ 
  23 |         path: `screenshots/${testInfo.title.replace(/\s+/g, '-')}-${browserName}-${date}-failure.png`,
  24 |         fullPage: true 
  25 |       });
  26 |       console.log(`Test failed in ${browserName}. Screenshot saved to screenshots/${testInfo.title.replace(/\s+/g, '-')}-${browserName}-${date}-failure.png`);
  27 |     }
  28 |   });
  29 |
  30 |
  31 |   test.describe('Login Functionality @smoke', () => {
  32 |   
  33 |     
  34 |     let loginPage: LoginPage;
  35 |   
  36 |     test.beforeAll(() => {
  37 |       console.log('Global setup before all tests');
  38 |     });
  39 |   
  40 |     test.beforeEach(async ({ page }) => {
  41 |       loginPage = new LoginPage(page);
  42 |       await loginPage.goto();
  43 |     });
  44 |   
  45 |     test.afterEach(() => {
  46 |       console.log('Cleanup after each test');
  47 |     });
  48 |   
  49 |   
  50 |   
  51 |     test('Valid Login with POM', async () => {
  52 |       // Use standard credentials for SauceDemo site
  53 |       await loginPage.login('standard_user', 'secret_sauce');
  54 |       
  55 |       const welcomeText = await loginPage.getWelcomeText();
  56 |       await expect(welcomeText).toBeVisible();
  57 |       
  58 |       const logoutButton = await loginPage.isLogoutVisible();
  59 |       await expect(logoutButton).toBeVisible();
  60 |     });
  61 |   
  62 |     test.skip('This test is skipped for now', async () => {
  63 |       // Not implemented yet
  64 |     });
  65 |   
  66 |     test('Failing test example', async ({ page }) => {
  67 |       test.fail(); // Intentional failure
> 68 |       await expect(page.locator('#nonexistent')).toBeVisible();
     |                                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  69 |     });
  70 |   
  71 |     test('Example domain test', async ({ page }) => {
  72 |       await page.goto('https://example.com');
  73 |       await expect(page).toHaveTitle(/Example Domain/);
  74 |     });
  75 |     });
  76 |
  77 |
  78 |   test.describe('Full E2E Flow: Login, Home, Checkout, Logout', () => {
  79 |     let homePage: HomePage;
  80 |     let feedbackPage: FeedbackPage;
  81 |     let loginPage: LoginPage;
  82 |     let yourInformation: YourInformation;
  83 |
  84 |     test.beforeEach(async ({ page }) => {
  85 |       homePage = new HomePage(page);
  86 |       feedbackPage = new FeedbackPage(page);
  87 |       loginPage = new LoginPage(page);
  88 |       yourInformation = new YourInformation(page);
  89 |       await loginPage.goto();
  90 |     });
  91 |
  92 |     test('Checkout a product', async () => {
  93 |       await loginPage.login('standard_user', 'secret_sauce');
  94 |       await homePage.addProductToCart('Sauce Labs Backpack');
  95 |       await homePage.goToCart();
  96 |       await homePage.checkout();
  97 |       await yourInformation.fillYourInformation('John', 'Doe', '10001');
  98 |     });
  99 |   });
```