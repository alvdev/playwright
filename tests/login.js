const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.contradefensa.com/ghost');

  await page.type('input[name="identification"]', 'myemail');
  await page.type('input[name="password"]', 'mypassword');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(10000);

  await browser.close();
})();
