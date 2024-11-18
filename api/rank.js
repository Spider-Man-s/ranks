const axios = require('axios');
const cheerio = require('cheerio');
const { send } = require('@vercel/node');

const getRank = async (req, res) => {
  const username = 'Lcyaa'; // Replace with your Fortnite username or pass it dynamically
  const url = `https://fortnitetracker.com/profile/all/${username}`;

  try {
    // Fetch the page's HTML
    const response = await axios.get(url);
    
    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract the rank information from the page
    const rankElement = $('.profile-current-ranks__content');
    const rankedReloadZb = rankElement
      .find('.profile-rank__title')
      .filter((_, element) => $(element).text().includes('Ranked Reload ZB'))
      .next()
      .find('.profile-rank__value')
      .text()
      .trim();

    // If no rank is found, return a default message
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
