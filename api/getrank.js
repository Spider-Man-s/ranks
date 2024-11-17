const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const url = 'https://fortnitetracker.com/profile/all/Lcyaa';

    // Example for using ScraperAPI or another proxy service
    const proxyUrl = `https://api.scraperapi.com?api_key=YOUR_API_KEY&url=${encodeURIComponent(url)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const rankedReloadZBContainer = $('.profile-rank')
      .filter((_, el) => $(el).find('.profile-rank__title').text().trim() === 'Ranked Reload ZB');

    if (rankedReloadZBContainer.length === 0) {
      throw new Error('Ranked Reload ZB not found');
    }

    const rankValue = rankedReloadZBContainer.find('.profile-rank__value').text().trim();
    const rankNumber = rankedReloadZBContainer.find('.profile-rank__rank').text().trim();
    const result = rankValue + (rankNumber ? ` ${rankNumber}` : '');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(result || 'Rank not found');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};
