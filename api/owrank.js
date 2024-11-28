import fetch from "node-fetch";

export default async function handler(req, res) {
  const url =
    "https://api.scraperapi.com/?api_key=4b095efa978a30e3f3ae7020b8808611&url=https%3A%2F%2Ftracker.gg%2Foverwatch%2Fprofile%2Fbattlenet%2FLcya%25232545%2Foverview";

  try {
    // Fetch the HTML content via ScraperAPI
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Find the starting index of the "Support" keyword
    const startIndex = html.indexOf("Support</h3>");
    if (startIndex === -1) {
      throw new Error("Support data not found in response.");
    }

    // Extract a portion of the text for analysis
    const snippet = html.slice(startIndex, startIndex + 500);

    // Search for the rank value after "Support"
    const rankStartIndex = snippet.indexOf("<!--[-->") + 8; // Start after "<!--[-->"
    const rankEndIndex = snippet.indexOf("<!--]", rankStartIndex); // End before "<!--]"

    if (rankStartIndex === -1 || rankEndIndex === -1) {
      throw new Error("Unable to extract Support rank from the response.");
    }

    // Extracted rank
    const supportRank = snippet.slice(rankStartIndex, rankEndIndex).trim();

    // Send the rank as the plain response
    res.status(200).send(supportRank);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({
      message: "Error processing data",
      details: error.message,
    });
  }
}
