"use strict";
// import { test, expect } from '@playwright/test';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const test_1 = require("@playwright/test");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file into process.env
dotenv_1.default.config();
// Define a test case for Amazon login
(0, test_1.test)('Login to Amazon.in', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    // Navigate to Amazon India website
    yield page.goto('https://www.amazon.in/');
    // Hover over account menu (activates the dropdown)
    yield page.hover('#nav-link-accountList');
    // Click on the account list to open sign in page
    yield page.click('#nav-link-accountList');
    // Find email input field by its name attribute and fill it with value from .env file
    // The || '' adds empty string fallback if EMAIL env var is undefined
    yield page.locator('input[name="email"]').fill(process.env.EMAIL || 'sehajpannu001@gmail.com');
    // Click continue button using XPath selector
    // Using multiple selector options - CSS selectors and XPath
    const continueButtonXPath = page.locator('xpath=//input[@class="a-button-input" and @type="submit" and @aria-labelledby="continue-announce"]');
    const continueButtonCSS = page.locator('#continue, .a-button-input[type="submit"]');
    yield continueButtonXPath.click();
    // Find password input field by its name attribute and fill it with value from .env file
    // The || '' adds empty string fallback if PASSWORD env var is undefined
    yield page.locator('input[name="password"]').fill(process.env.PASSWORD || 'Sehaj@amazon.com');
    // Click sign-in button - trying multiple possible selectors
    const signInButton = page.locator('#signInSubmit, input[type="submit"], .a-button-input').first();
    yield signInButton.click();
    // Verify login was successful by checking if "Hello" text is visible
    // This text appears in the header when logged in
    yield (0, test_1.expect)(page.getByText('Hello')).toBeVisible();
}));
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
