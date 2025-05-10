import { test } from '@playwright/test';
import { injectAxe, runAxe } from '../utility/accessibility-helper';

test('accessibility scan', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await injectAxe(page);
  const results = await runAxe(page);
  console.log('Accessibility Violations:', results.violations);
});