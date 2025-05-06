import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { FeedbackPage } from '../pages/FeedbackPage';


// Take screenshot only when a test fails #// This is a good practice to take screenshots when a test fails 
// #This approach is called as "After Hook" & topic is called as "Hooks"
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
      console.log('Cleanup after each test');
    });
  
  
  
    test('Valid Login with POM', async () => {
      // Use standard credentials for SauceDemo site
      await loginPage.login('standard_user', 'secret_sauce');
      
      const welcomeText = await loginPage.getWelcomeText();
      await expect(welcomeText).toBeVisible();
      
      const logoutButton = await loginPage.isLogoutVisible();
      await expect(logoutButton).toBeVisible();
    });
  
    // test.skip('This test is skipped for now', async () => {
    //   // Not implemented yet
    // });
  
    // test('Failing test example', async ({ page }) => {
    //   test.fail(); // Intentional failure
    //   await expect(page.locator('#nonexistent')).toBeVisible();
    // });
  
    test('Example domain test', async ({ page }) => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle(/Example Domain/);
    });
    });
  test.describe('Full E2E Flow: Login, Home, Checkout, Logout', () => {
    let homePage: HomePage;
    let feedbackPage: FeedbackPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      feedbackPage = new FeedbackPage(page);
      loginPage = new LoginPage(page);
      await loginPage.goto();
    });

    test('Checkout a product', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await homePage.addProductToCart('Sauce Labs Backpack');
    });
  });