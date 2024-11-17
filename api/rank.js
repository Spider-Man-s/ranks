const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with the desired profile URL

  try {
    // Set up custom headers to simulate a real browser request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    };

    // Fetch the profile page with custom headers
    const { data } = await axios.get(profileUrl, { headers });

    // Load the page's HTML content with Cheerio
    const $ = cheerio.load(data);

    // Extract the "Ranked Reload ZB" rank data
    const rank = $('div.profile-rank__title')
      .filter((i, el) => $(el).text().includes('Ranked Reload ZB')) // Look for the "Ranked Reload ZB" section
      .next() // Get the next div containing the rank value
      .find('div.profile-rank__value') // Find the rank value
      .text()
      .trim();

    // Extract the specific rank number (e.g., #6,642)
    const rankNumber = $('div.profile-rank__title')
      .filter((i, el) => $(el).text().includes('Ranked Reload ZB')) // Filter for "Ranked Reload ZB"
      .next() // Get the next div that contains the rank
      .find('div.profile-rank__rank') // Find the rank number
      .text()
      .trim();

    if (rank && rankNumber) {
      // Send the rank and rank number as a JSON response
      res.status(200).json({ rank, rankNumber });
    } else {
      // If rank is not found, send a fallback message
      res.status(404).json({ error: 'Rank or Rank number not found' });
    }
  } catch (error) {
    // Send 500 error if something goes wrong
    res.status(500).json({ error: 'Failed to fetch rank' });
  }
};
