
const scraperApiKey = '4b095efa978a30e3f3ae7020b8808611';  // Replace with your ScraperAPI key
const axios = require('axios'); // Import axios

const profileURL = 'https://fortnitetracker.com/profile/all/Lcyaa'; // Replace with the profile URL you want to scrape

// Handler function for the API
async function fetchRankData(req, res) {
  try {
    // Make a request to Scraper API with the profile URL
    const response = await axios.get('https://api.scraperapi.com', {
      params: {
        api_key: scraperApiKey,
        url: profileURL,
        render: true // Ensure rendering is enabled
      }
    });

    // Log the fetched HTML (for debugging)
    console.log('Fetched HTML:', response.data);

    // Send back the HTML or any parsed data you need
    res.json({ html: response.data });

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    res.status(500).json({ error: 'Error fetching or parsing data' });
  }
}

// Export the handler so it can be used by the serverless platform
module.exports = fetchRankData;
