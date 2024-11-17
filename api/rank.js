const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with the desired profile URL

  try {
    // Fetch the profile page
    const { data } = await axios.get(profileUrl);

    // Load the page's HTML content with Cheerio
    const $ = cheerio.load(data);

    // Extract the "Ranked Reload ZB" rank data
    const rank = $('div.profile-rank__title')
      .filter((i, el) => $(el).text().includes('Ranked Reload ZB')) // Look for the "Ranked Reload ZB" section
      .next() // Get the next div containing the rank value
      .find('div.profile-rank__value') // Find the rank value
      .text()
      .trim();

    if (rank) {
      // Send the rank as a JSON response
      res.status(200).json({ rank });
    } else {
      // If rank is not found, send a fallback message
      res.status(200).json({ rank: 'Rank not found' });
    }
  } catch (error) {
    console.error('Error fetching rank:', error);
    res.status(500).json({ error: 'Failed to fetch rank' }); // Send 500 error if something goes wrong
  }
};
