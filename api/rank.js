const fetch = require('node-fetch');

export default async function handler(req, res) {
  try {
    // Directly use the ScraperAPI URL
    const response = await fetch('https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa');

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response as text since it's HTML
    const html = await response.text();

    // Send the HTML content directly to the client, escaped for safety
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

    // Send error details back as HTML
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
