const axios = require('axios');
const cheerio = require('cheerio');

// Handler function for Vercel or local usage
const handler = async (req, res) => {
  const username = 'Lcyaa'; // You can modify this to dynamically accept a username

  const url = `https://fortnitetracker.com/profile/all/${username}`;

  try {
    // Sending request with headers to mimic a real browser
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
      }
    });

    if (response.status !== 200) {
      return res.status(500).json({ error: `Failed to fetch data, status code: ${response.status}` });
    }

    // Parse the HTML with cheerio
    const $ = cheerio.load(response.data);

    // Extract rank info from the profile page
    const rankElement = $('.profile-current-ranks__content');

    // Extract specific rank values, e.g., "Ranked BR"
    const rankedBR = rankElement
      .find('.profile-rank__title')
      .filter((_, element) => $(element).text().includes('Ranked BR'))
      .next()
      .find('.profile-rank__value')
      .text()
      .trim();

    if (!rankedBR) {
      return res.status(404).json({ error: 'Rank not found' });
    }

    // Send back the rank data as JSON
    res.status(200).json({ rank: rankedBR });
  } catch (error) {
    console.error('Error fetching rank:', error.message);
    res.status(500).json({ error: 'Failed to fetch rank', details: error.message });
  }
};

module.exports = handler;
