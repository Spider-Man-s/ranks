const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Get the profileUrl from the query parameter
  const { profileUrl } = req.query;

  // If the profile URL is missing, return a bad request error
  if (!profileUrl) {
    return res.status(400).json({ error: 'Profile URL is required' });
  }

  try {
    // Trigger your Apify actor using the Apify API
    const response = await fetch('https://api.apify.com/v2/acts/<your-apify-actor-id>/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apify ${process.env.APIFY_API_KEY}`, // Use your Apify API key here
      },
      body: JSON.stringify({
        startUrls: [{ url: profileUrl }], // Pass the Fortnite profile URL to the actor
      }),
    });

    // Get the JSON response from the Apify API
    const data = await response.json();

    // If the actor ran successfully, return the data
    if (response.ok) {
      res.status(200).json(data); // Return the Apify actor run data
    } else {
      res.status(500).json({ error: 'Failed to trigger Apify actor' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
