// Import necessary modules
import fetch from 'node-fetch';
import cheerio from 'cheerio';

// Vercel serverless function entry point
export default async (req, res) => {
  try {
    // Scraper API URL
    const url = 'https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa&autoparse=true';

    // Fetch data from the Scraper API
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(html);

    // Select the relevant element containing the "Reload Zero Build" rank
    const rankElement = $('div.profile-current-ranks .profile-rank__wrapper .profile-rank__value:contains("Reload Zero Build")')
      .next()
      .text()
      .trim();

    // Return the extracted rank
    res.status(200).json({ rank: rankElement });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching or parsing data', details: error.message });
  }
};
