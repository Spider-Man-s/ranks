const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch the rank
const getRank = async (username) => {
  const url = `https://fortnitetracker.com/profile/all/${username}`;

  try {
    // Fetch the page's HTML
    const response = await axios.get(url);

    // Check if the request was successful
    if (response.status !== 200) {
      console.error(`Failed to fetch page with status code: ${response.status}`);
      return;
    }

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Find the rank element by searching for the appropriate class or text
    const rankElement = $('.profile-current-ranks__content');

    // Extract rank information
    const rankedBR = rankElement
      .find('.profile-rank__title')
      .filter((_, element) => $(element).text().includes('Ranked BR'))
      .next()
      .find('.profile-rank__value')
      .text()
      .trim();

    // Check if a rank was found
    if (!rankedBR) {
      console.log('Rank not found!');
      return;
    }

    // Print the rank
    console.log(`Rank for ${username}: ${rankedBR}`);
  } catch (error) {
    console.error('Error fetching rank:', error.message);
  }
};

// Example: Fetch the rank for a given username
const username = 'Lcyaa'; // Replace with the desired Fortnite username
getRank(username);
