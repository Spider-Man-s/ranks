import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://splendid-groovy-feverfew.glitch.me/valorant/eu/Lcya/ttv";

  try {
    // Fetch the data from the provided URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    // Match the rank and RR using regex
    const rankMatch = text.match(/\[([^\]]+)]/); // Matches content inside square brackets
    const rrMatch = text.match(/: (\d+) RR/);   // Matches RR value after ': '

    if (!rankMatch || !rrMatch) {
      throw new Error("Unable to extract rank or RR from response.");
    }

    const rank = rankMatch[1];
    const rr = rrMatch[1];

    // Format the response
    const formattedResponse = `${rank} - ${rr} RR`;

    // Send the formatted response
    res.status(200).send(formattedResponse);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({
      message: "Error processing data",
      details: error.message,
    });
  }
}
