const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { profileUrl } = req.query; // Get the profile URL from the query parameters

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

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Return Apify run data
    } else {
      res.status(500).json({ error: 'Failed to trigger Apify actor' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
