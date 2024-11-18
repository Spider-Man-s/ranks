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

    // Log the response HTML for debugging
    console.log("HTML content fetched from ScraperAPI:\n", response.data);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Log the structure of the loaded HTML to confirm the rank element exists
    console.log("Parsed HTML:\n", $.html());

    // Use the new provided selector to target the correct rank element
    const rankElement = $("#overview > div.trn-grid.trn-grid__sidebar-right > aside > div.trn-grid.trn-grid--vertical > div.profile-current-ranks.trn-card.trn-card--no-overflow > div > div:nth-child(4) > div.profile-rank__container > div");

    // Log the rank element for debugging
    console.log("Rank element found:\n", rankElement.html());

    // Extract the rank value
    const rankedReloadZb = rankElement
      .find('.profile-rank__value')
      .text()
      .trim();

    // Log the rank value for debugging
    console.log("Ranked Reload ZB:", rankedReloadZb);

    // If the rank is not found, return an error message
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


