const fetch = require('node-fetch');
const cheerio = require('cheerio');

export default async function handler(req, res) {
  const apiKey = '4b095efa978a30e3f3ae7020b8808611';
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa';

  try {
    const response = await fetch(`https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(profileUrl)}`);
    const html = await response.text();

    // Load HTML content using cheerio
    const $ = cheerio.load(html);

    // Find the script tag containing the profile object
    const scriptContent = $('script').html();
    if (!scriptContent) {
      return res.status(404).json({ message: 'Profile data not found in HTML.' });
    }

    // Use regular expression to extract the profile object from the script
    const profileMatch = scriptContent.match(/const profile = (\{.*?\});/);
    if (profileMatch) {
      // Parse the profile data as JSON
      const profileData = JSON.parse(profileMatch[1]);

      // Extract the rank and division data
      const rankedStats = profileData.stats.find(stat => stat.isCompetitive); // Assuming you're interested in competitive stats
      if (rankedStats && rankedStats.stats && rankedStats.stats.squads) {
        const currentRank = rankedStats.stats.squads.find(stat => stat.metadata.key === "TRNRating");
        const rank = currentRank ? currentRank.metadata.rank : null;
        const division = rankedStats.currentDivisionName;

        // Return rank and division information
        res.status(200).json({
          rank: rank || 'N/A',
          division: division || 'N/A'
        });
      } else {
        res.status(404).json({ message: 'Rank or division not found in the profile data.' });
      }
    } else {
      res.status(404).json({ message: 'Profile object not found in the script.' });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data from Fortnite Tracker API.' });
  }
}
