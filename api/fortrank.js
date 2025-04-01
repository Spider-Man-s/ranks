const fetch = require("node-fetch");

export default async function handler(req, res) {
 // const apiKey = "4b095efa978a30e3f3ae7020b8808611";
  const url =
    "https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ffortnitetracker.com%2Fprofile%2Fall%2FLcyaa";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    const startIndex = html.indexOf('"modeName":"Ranked Reload ZB"');
    if (startIndex === -1) {
      throw new Error("Ranked Reload data not found in response.");
    }

    const snippet = html.slice(startIndex, startIndex + 1000);

    const rankMatch = snippet.match(/"rank":(\d+)/);
    const highestRankMatch = snippet.match(/"highestRank":(\d+)/);
    const divisionNameMatch = snippet.match(/"currentDivisionName":"(.*?)"/);

    if (!rankMatch || !highestRankMatch || !divisionNameMatch) {
      throw new Error("Unable to extract rank data from the response.");
    }

    const rank = parseInt(rankMatch[1], 10);
    const highestRank = parseInt(highestRankMatch[1], 10);
    const currentDivisionName = divisionNameMatch[1];

    // Return the message directly instead of wrapping it in JSON
    res.status(200).send(`${currentDivisionName} #${rank} (peak #${highestRank})`);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send("Error processing data");
  }
}
