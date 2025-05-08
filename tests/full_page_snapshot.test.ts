import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


// Helper function to bypass Amazon captcha
async function bypassAmazonCaptcha(page: Page) {
    // Navigate to Amazon India website with simpler approach
    await page.goto('https://www.amazon.in/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // Simplify the bypass strategy - minimize waiting
    await page.waitForTimeout(1000);
    
    // Refresh with domcontentloaded instead of networkidle
    await page.reload({ 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Shorter wait time
    await page.waitForTimeout(1000);
    
    console.log('Applied simplified bypass strategy');
  }
  

test.describe('Full Page Snapshot', () => {

    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    });
    
    test('full page visual regression', async ({ page }) => {

    await bypassAmazonCaptcha(page);

    await page.goto('https://www.amazon.com/');

    expect(await page.screenshot()).toMatchSnapshot('snapshots for comparison/snap_amazon.png', { maxDiffPixelRatio: 0.01 });

    });

    test('single element visual regression', async ({ page }) => {

        await bypassAmazonCaptcha(page);

        
    
    
        expect(await page.screenshot()).toMatchSnapshot('snapshots for comparison/snap_amazon.png', { maxDiffPixelRatio: 0.01 });
    
        });
});

