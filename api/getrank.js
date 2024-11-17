const axios = require('axios');
const cheerio = require('cheerio');

// Scrape the Fortnite profile rank from Tracker (using fixed URL)
async function getRank() {
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Fixed URL

  try {
    // Fetch the page
    const { data } = await axios.get(profileUrl);

    // Use Cheerio to parse the HTML and extract rank data
    const $ = cheerio.load(data);

    // Find the 'Ranked Reload ZB' rank
    const rank = $('div.profile-rank__title')
      .filter((i, el) => $(el).text().includes('Ranked Reload ZB')) // Find the correct rank
      .next() // Navigate to the next div that contains the rank value
      .find('div.profile-rank__value') // Get the rank value
      .text()
      .trim();

    return rank || 'Rank not found'; // Return rank or a fallback if not found
  } catch (error) {
    console.error('Error fetching rank:', error);
    return 'Error fetching rank';
  }
}

// Export the function for external use
module.exports = { getRank };
