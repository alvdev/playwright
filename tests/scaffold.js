const playwright = require('@playwright/test');
const data = [];

(async () => {
  const browser = await playwright['chromium'].launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://old.reddit.com/r/askreddit');
  await page.waitForSelector('#siteTable');

  const posts = await page.$$('div.thing');

  for (let post of posts) {
    const title = await post.$eval('.title a', el => el.textContent);
    const url = await post.$eval('.title a', el => el.href);
    const upvotes = await post.$eval('.score.unvoted', el => el.textContent);
    const comments = await post.$eval('.comments', el => el.textContent);
    const time = await post.$eval('.tagline time', el => el.textContent);
    data.push({ title, url, upvotes, comments, time });
  }

  console.log(data);
  console.log(data.length);

  await browser.close();
})();
