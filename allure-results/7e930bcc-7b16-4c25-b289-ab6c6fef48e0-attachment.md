# Test info

- Name: accessibility scan
- Location: D:\All Work\playwright-ts-demo\tests\accessibility.test.ts:4:5

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://www.amazon.com/", waiting until "load"

    at D:\All Work\playwright-ts-demo\tests\accessibility.test.ts:5:14
```

# Test source

```ts
  1 | import { test } from '@playwright/test';
  2 | import { injectAxe, runAxe } from '../utility/accessibility-helper';
  3 |
  4 | test('accessibility scan', async ({ page }) => {
> 5 |   await page.goto('https://www.amazon.com/');
    |              ^ Error: page.goto: Test ended.
  6 |   await injectAxe(page);
  7 |   const results = await runAxe(page);
  8 |   console.log('Accessibility Violations:', results.violations);
  9 | });
```