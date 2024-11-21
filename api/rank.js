const fetch = require("node-fetch");

export default async function handler(req, res) {
  const apiKey = "4b095efa978a30e3f3ae7020b8808611";
  const url =
    "https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa";

  try {
    // Fetch the HTML content via ScraperAPI
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response as plain text
    const html = await response.text();

    // Search for the "modeName":"Ranked Reload ZB" string
    const startIndex = html.indexOf('"modeName":"Ranked Reload ZB"');
    if (startIndex === -1) {
      throw new Error("Ranked Reload data not found in response.");
    }

    // Extract the portion of the text starting at the found index
    const snippet = html.slice(startIndex, startIndex + 1000); // Capture 1000 characters for processing

    // Extract the required data using regex
    const rankMatch = snippet.match(/"rank":(\d+)/);
    const highestRankMatch = snippet.match(/"highestRank":(\d+)/);
    const divisionNameMatch = snippet.match(/"currentDivisionName":"(.*?)"/);

    if (!rankMatch || !highestRankMatch || !divisionNameMatch) {
      throw new Error("Unable to extract rank data from the response.");
    }

    // Prepare the extracted data
    const rank = parseInt(rankMatch[1], 10);
    const highestRank = parseInt(highestRankMatch[1], 10);
    const currentDivisionName = divisionNameMatch[1];

    // Return the formatted response
    const rankMessage = `Lcyas rank in Ranked Reload ZB is: ${currentDivisionName} #${rank} (peak #${highestRank})`;

    // Send the formatted message as the response
    res.status(200).json({ message: rankMessage });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({
      message: "Error processing data",
      details: error.message,
    });
  }
}
