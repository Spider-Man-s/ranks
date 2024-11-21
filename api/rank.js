const fetch = require('node-fetch');

export default async function handler(req, res) {
  try {
    // Directly fetch the HTML response
    const response = await fetch('https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract the `profile` object using regex
    const profileMatch = html.match(/const profile = (\{.*?\});/s);
    if (!profileMatch) {
      throw new Error('Profile data not found in HTML.');
    }

    // Parse the profile object
    const profileData = JSON.parse(profileMatch[1]);

    // Find the specific segment containing "Ranked Reload"
    const rankedReloadData = profileData.stats.find(segment =>
      segment.modeName && segment.modeName.includes("Ranked Reload")
    );

    if (!rankedReloadData) {
      throw new Error('Ranked Reload data not found in profile.');
    }

    // Extract desired fields
    const result = {
      currentDivisionName: rankedReloadData.currentDivisionName,
      rank: rankedReloadData.rank,
      highestRank: rankedReloadData.highestRank,
    };

    // Return the extracted data as JSON
    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
}
