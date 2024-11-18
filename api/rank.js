const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  let browser;
  try {
    // Launch Puppeteer with chrome-aws-lambda configuration
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath || '/usr/bin/chromium-browser',
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    const url = 'https://fortnitetracker.com/profile/some-profile'; // Replace with your desired URL
    
    await page.goto(url, {
      waitUntil: 'networkidle2', // Wait until the network is idle
    });

    // Extract rank data from the page using appropriate selectors
    const rankData = await page.evaluate(() => {
      const rankElement = document.querySelector('.profile-current-ranks__content .profile-rank__value');
      return rankElement ? rankElement.textContent.trim() : 'Rank not found';
    });

    res.status(200).json({ rank: rankData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rank', details: error.toString() });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
