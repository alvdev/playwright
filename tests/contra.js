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
// Wait for questions are loaded
  await page.waitForLoadState('networkidle');

  const questions = await page.$$('#questionForm');
  const choices = await page.$$('.answer-container');

  for (let question of questions) {
    const title = await question.$eval('#question', el => el.innerText);

    const answers = [];
    for (let answer of choices) {
      const choice = await answer.$eval('.answer-text', el => el.innerText);
      answers.push(choice);
    }

    data.push({ title, answers });
  }

  console.log(data);
  console.log(data.length);

  await browser.close();
})();
