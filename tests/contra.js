const playwright = require('@playwright/test');
const data = [];

(async () => {
  const browser = await playwright['chromium'].launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.contradefensa.com/certified-ethical-hacker/');
  await page.waitForSelector('#site-main');
  await page.waitForTimeout(5000);

  const posts = await page.$$('#questionForm');

  for (let post of posts) {
    const question = await post.$eval('#question', el => el.innerText);
    const answers = await post.$eval('.answer-text', el => el.innerText);
    data.push({ question, answers });
  }

  console.log(data);
  console.log(data.length);

  await browser.close();
})();
