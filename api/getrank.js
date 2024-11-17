const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const url = 'https://fortnitetracker.com/profile/all/Lcyaa';

  try {
    // Fetch the page HTML
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Find the "Ranked Reload ZB" rank
    const rankedReloadZBContainer = $('.profile-rank')
      .filter((_, el) => $(el).find('.profile-rank__title').text().trim() === 'Ranked Reload ZB');

    const rankValue = rankedReloadZBContainer.find('.profile-rank__value').text().trim();
    const rankNumber = rankedReloadZBContainer.find('.profile-rank__rank').text().trim();

    // Concatenate the rank and the number (if available)
    const result = rankValue + (rankNumber ? ` ${rankNumber}` : '');

    // Send the result as the response
    res.status(200).send(result || 'Rank not found');
  } catch (error) {
    res.status(500).send('Error fetching rank data');
  }
};
