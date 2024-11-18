// api/fortniteRank.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // The API key and URL for scraping Fortnite Tracker profile
  const apiKey = '4b095efa978a30e3f3ae7020b8808611';
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa';

  // Scrape the data using ScraperAPI
  try {
    const response = await fetch(`https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(profileUrl)}`);
    const data = await response.json();

    // Find the 'Ranked Reload ZB' data from the rankedStats array
    const rankedReloadData = data.rankedStats.find(
      (stat) => stat.modeName === 'Ranked Reload ZB' && stat.season === 32
    );

    // If the data is found, extract the rank and current division
    if (rankedReloadData) {
      const currentDivision = rankedReloadData.currentDivisionName; // e.g., "Unreal"
      const rank = rankedReloadData.rank; // e.g., 6642
      
      // Send the response back to the client
      res.status(200).json({
        currentDivision: currentDivision,
        rank: rank,
      });
    } else {
      res.status(404).json({ message: 'No data found for "Ranked Reload ZB" in season 32.' });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data from Fortnite Tracker API.' });
  }
}
