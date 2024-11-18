const axios = require('axios');
const cheerio = require('cheerio');

const scraperApiKey = '4b095efa978a30e3f3ae7020b8808611';  // Replace with your ScraperAPI key

const getRank = async (req, res) => {
  const username = 'Lcyaa'; // Replace with the Fortnite username
  const url = `https://fortnitetracker.com/profile/all/${username}`;

  try {
    // Send the request to ScraperAPI to avoid getting blocked
    const response = await axios.get(`http://api.scraperapi.com`, {
      params: {
        api_key: scraperApiKey,  // Your ScraperAPI key
        url: url,  // The URL to scrape
      },
    });

    // Load the HTML content from ScraperAPI
    const htmlContent = response.data;

    // Parse HTML content using Cheerio
    const $ = cheerio.load(htmlContent);

    // Use the provided selector to get the rank container
    const rankElement = $('#overview > div.trn-grid.trn-grid__sidebar-right > aside > div.trn-grid.trn-grid--vertical > div.profile-current-ranks.trn-card.trn-card--no-overflow');

    // Find the specific rank for "Ranked Reload ZB"
    const rankedReloadZb = rankElement
      .find('.profile-rank')
      .filter((_, element) => {
        return $(element).find('.profile-rank__title').text().includes('Ranked Reload ZB');
      })
      .find('.profile-rank__value')
      .text()
      .trim();

    // Check if rank is found
    if (!rankedReloadZb) {
      return res.status(404).json({ error: 'Rank not found' });
    }

    // Send back the rank data in the response
    res.status(200).json({ rank: rankedReloadZb });
  } catch (error) {
    console.error('Error fetching rank:', error);
    res.status(500).json({ error: 'Failed to fetch rank', details: error.message });
  }
};

module.exports = getRank;

