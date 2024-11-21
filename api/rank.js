const fetch = require('node-fetch');

export default async function handler(req, res) {
  const apiKey = '4b095efa978a30e3f3ae7020b8808611';
  const profileUrl = 'https://fortnitetracker.com/profile/all/Lcyaa';

  try {
    // Fetch the HTML content via ScraperAPI
    const response = await fetch(`https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(profileUrl)}`);
    const html = await response.text();

    // Send the HTML content directly to the client
    res.status(200).send(`
      <html>
        <body>
          <h1>Scraper Response</h1>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send(`
      <html>
        <body>
          <h1>Error</h1>
          <p>${error.message}</p>
        </body>
      </html>
    `);
  }
}
