import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function injectAxe(page: Page) {
  const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  await page.addScriptTag({ content: axeSource });
}

export async function runAxe(page: Page) {
  return await page.evaluate(async () => {
    return await (window as any).axe.run();
  });
}
