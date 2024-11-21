const { execFile } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');

export default async function handler(req, res) {
  try {
    // Fetch the scraper response
    const response = await fetch('https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    // Path to the Python script
    const scriptPath = path.join(__dirname, 'extract_ranked_data.py');

    // Run the Python script with the HTML as input
    execFile('python3', [scriptPath], { input: html }, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing data', details: error.message });
        return;
      }
      if (stderr) {
        console.error('Stderr:', stderr);
        res.status(500).json({ message: 'Error in Python script', details: stderr });
        return;
      }

      // Parse the Python script output
      const result = JSON.parse(stdout);
      if (result.error) {
        res.status(400).json({ message: result.error });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
}
