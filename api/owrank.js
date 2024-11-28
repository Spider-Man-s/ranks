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

    // Find the starting index of "Support</h3>"
    const supportIndex = html.indexOf("Support</h3>");
    if (supportIndex === -1) {
      throw new Error("Support data not found in response.");
    }

    // Extract a portion of the text for analysis
    const snippet = html.slice(supportIndex, supportIndex + 1000);

    // Find the first occurrence of "class=\"value\""
    const valueIndex = snippet.indexOf('class="value"');
    if (valueIndex === -1) {
      throw new Error("Rank value not found near Support.");
    }

    // Extract the rank data using the marker [--> and <!--]
    const rankStart = snippet.indexOf("[-->", valueIndex) + 4;
    const rankEnd = snippet.indexOf("<!--", rankStart);
    if (rankStart === -1 || rankEnd === -1) {
      throw new Error("Unable to extract rank from response.");
    }

    const rank = snippet.slice(rankStart, rankEnd).trim();

    // Send the rank as the plain response
    res.status(200).send(rank);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({
      message: "Error processing data",
      details: error.message,
    });
  }
}
