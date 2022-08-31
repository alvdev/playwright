import { chromium } from '@playwright/test';
import { login } from './config.js';

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(login.url);

  await page.type('input[name="identification"]', login.email);
  await page.type('input[name="password"]', login.password);
  await page.keyboard.press('Enter');

  await page.waitForTimeout(10000);

  await browser.close();
})();
