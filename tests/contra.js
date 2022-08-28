const playwright = require('playwright');
async function main() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });
}

const page = await browser.newPage();
await page.goto('https://finance.yahoo.com/world-indices');
await page.waitForTimeout(5000);
await browser.close();

main();
