
const scraperApiKey = '4b095efa978a30e3f3ae7020b8808611';  // Replace with your ScraperAPI key
const profileURL = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with the profile URL you want to scrape
const axios = require('axios');
async function fetchRankData() {
  try {
    // Make a request to Scraper API with the profile URL
    const response = await axios.get(`https://api.scraperapi.com`, {
      params: {
        api_key: scraperApiKey,
        url: profileURL,
        render: true // Make sure rendering is enabled
      }
    });

    const html = response.data;

    // Now, parse the HTML to extract rank data using a method like Cheerio or DOMParser
    const cheerio = require('cheerio'); // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Scrape the rank data (by targeting the elements that hold rank values)
    const ranks = [];

    // Extract Ranked BR
    const rankedBR = $('.profile-rank__title:contains("Ranked BR")').next('.profile-rank__container')
      .find('.profile-rank__value').text().trim();
    ranks.push({ title: 'Ranked BR', rank: rankedBR });

    // Extract Ranked ZB
    const rankedZB = $('.profile-rank__title:contains("Ranked ZB")').next('.profile-rank__container')
      .find('.profile-rank__value').text().trim();
    ranks.push({ title: 'Ranked ZB', rank: rankedZB });

    // Extract Ranked Reload BR
    const rankedReloadBR = $('.profile-rank__title:contains("Ranked Reload BR")').next('.profile-rank__container')
      .find('.profile-rank__value').text().trim();
    ranks.push({ title: 'Ranked Reload BR', rank: rankedReloadBR });

    // Extract Ranked Reload ZB
    const rankedReloadZB = $('.profile-rank__title:contains("Ranked Reload ZB")').next('.profile-rank__container')
      .find('.profile-rank__value').text().trim();
    ranks.push({ title: 'Ranked Reload ZB', rank: rankedReloadZB });

    // Output the ranks
    console.log(ranks);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
}

fetchRankData();
