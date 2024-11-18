const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const url = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with your target URL

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // Extract rank data
    const data = await page.evaluate(() => {
      const rankedBR = document.querySelector(
        'div.profile-rank__title:contains("Ranked Reload ZB")'
      );

      if (rankedBR) {
        const rank = rankedBR.nextElementSibling.querySelector('.profile-rank__value')
          ?.innerText;
        const rankNumber = rankedBR.nextElementSibling.querySelector('.profile-rank__rank')
          ?.innerText;
        return { rank, rankNumber };
      }

      return null;
    });

    await browser.close();

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Rank not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rank', details: error.toString() });
  }
};
