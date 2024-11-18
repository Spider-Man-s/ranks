// api/fortniteRank.js
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  // The API key and URL for scraping Fortnite Tracker profile
  const apiKey = '4b095efa978a30e3f3ae7020b8808611';
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa';

  // Scrape the data using ScraperAPI
  try {
    const response = await fetch(`https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(profileUrl)}`);

    // Get the response as HTML text
    const html = await response.text();

    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(html);

    // Find the rank and current division in the HTML
    const rankElement = $('img[src*="ranks/18.png"]').parent().text().trim();  // Find the image that represents the rank
    const divisionElement = $('img[src*="ranks/18.png"]').closest('div').prev().text().trim();  // Get the division name

    if (rankElement && divisionElement) {
      // Extract the rank (e.g., 6642)
      const rankMatch = rankElement.match(/\d+/);
      const rank = rankMatch ? rankMatch[0] : null;

      // Send the rank and division in the response
      res.status(200).json({
        currentDivision: divisionElement,  // Division name (e.g., "Unreal")
        rank: rank,  // Rank (e.g., 6642)
      });
    } else {
      res.status(404).json({ message: 'Rank or division not found in the HTML.' });
    }

  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data from Fortnite Tracker API.' });
  }
}
