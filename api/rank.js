
const scraperApiKey = '4b095efa978a30e3f3ae7020b8808611';  // Replace with your ScraperAPI key
const axios = require('axios'); // Import axios


const profileURL = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with the profile URL you want to scrape

async function fetchRankData() {
  try {
    // Make a request to Scraper API with the profile URL
    const response = await axios.get(`https://api.scraperapi.com`, {
      params: {
        api_key: scraperApiKey,
        url: profileURL,
        render: true // Ensure rendering is enabled
      }
    });

    // Print out the raw HTML response
    console.log('Fetched HTML:', response.data);

    // You can then parse this HTML to find specific elements like rank data
    // (use this data to guide the next steps of extraction)

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
}

fetchRankData();
