const { chromium } = require('playwright'); // Importing Chromium from Playwright

(async () => {
  // Launch a headless browser instance
  const browser = await chromium.launch({ headless: true }); // or { headless: false } to see the browser
  const page = await browser.newPage();
  
  // Go to the Fortnite Tracker page
  await page.goto('https://fortnitetracker.com/profile/all/Lcyaa');
  
  // Extract rank data from the page using a selector
  const rank = await page.$eval('.profile-rank', el => {
    const rankValue = el.querySelector('.profile-rank__value')?.textContent;
    const rankNumber = el.querySelector('.profile-rank__rank')?.textContent;
    return rankValue + (rankNumber ? ` ${rankNumber}` : '');
  });
  
  console.log('Rank:', rank); // Output the result to the console

  // Close the browser instance
  await browser.close();
})();
