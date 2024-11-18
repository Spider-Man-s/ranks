const axios = require('axios');

// ScraperAPI Key
const scraperApiKey = '4b095efa978a30e3f3ae7020b8808611';  // Replace with your ScraperAPI key

const getRank = async (req, res) => {
  const username = 'Lcyaa'; // Replace with your Fortnite username
  const url = `https://fortnitetracker.com/profile/all/${username}`;

  try {
    // Send the request to ScraperAPI to avoid getting blocked
    const response = await axios.get(`http://api.scraperapi.com`, {
      params: {
        api_key: scraperApiKey,  // Your ScraperAPI key
        url: url,
      },
    });

    // Load the HTML content from ScraperAPI
    const htmlContent = response.data;

    // Parse HTML content using Cheerio (same as before)
    const $ = require('cheerio').load(htmlContent);
    
    const rankElement = $('.profile-current-ranks__content');
    const rankedReloadZb = rankElement
      .find('.profile-rank__title')
      .filter((_, element) => $(element).text().includes('Ranked Reload ZB'))
      .next()
      .find('.profile-rank__value')
      .text()
      .trim();

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
