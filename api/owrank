import fetch from "node-fetch";

export default async function handler(req, res) {
  const apiKey = "4b095efa978a30e3f3ae7020b8808611";
  const profileUrl =
    "https://tracker.gg/overwatch/profile/battlenet/Lcya%25232545/overview";
  const scraperUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(
    profileUrl
  )}`;

  try {
    // Fetch the HTML content via ScraperAPI
    const response = await fetch(scraperUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the HTML content as plain text
    const html = await response.text();

    // Search for the "Support" section
    const supportIndex = html.indexOf("Support</h3>");
    if (supportIndex === -1) {
      throw new Error("Support data not found in response.");
    }

    // Extract the portion of HTML near "Support"
    const snippet = html.slice(supportIndex, supportIndex + 1000); // Capture a chunk of HTML for processing

    // Use regex to find the rank associated with Support
    const rankMatch = snippet.match(/<div class="value"[^>]*>\s*([\w\s]+)\s*</);
    if (!rankMatch) {
      throw new Error("Unable to extract Support rank from the response.");
    }

    // Extracted rank
    const supportRank = rankMatch[1].trim();

    // Send the extracted data
    res.status(200).send(
      `Lcya#2545's Support rank is: ${supportRank}`
    );
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send("Error processing data");
  }
}
