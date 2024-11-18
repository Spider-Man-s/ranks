// Import necessary modules
import fetch from 'node-fetch';

// Vercel serverless function entry point
export default async (req, res) => {
  try {
    // Fetch data from the Scraper API
    const url = 'https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa&autoparse=true';
    const response = await fetch(url);
    const jsonData = await response.json(); // Parse response as JSON

    // Extract "Ranked Reload Zero Build" rank if available
    const rankedReloadZB = jsonData.rankedStats?.find(stat => stat.modeName === "Ranked Reload ZB");

    // Check if rank data was found
    if (rankedReloadZB) {
      const rank = rankedReloadZB.rank; // Extract rank
      res.status(200).json({ rank });
    } else {
      res.status(404).json({ error: "Ranked Reload Zero Build rank not found." });
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Error fetching or parsing data', details: error.message });
  }
};
