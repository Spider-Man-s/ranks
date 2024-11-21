import json
import re
import sys

def extract_ranked_reload_info(html):
    # Regex to extract the `profile` JSON object
    match = re.search(r"const profile = (\{.*?\});", html, re.DOTALL)
    if not match:
        return {"error": "Profile data not found in HTML"}

    try:
        # Parse the JSON object
        profile_data = json.loads(match.group(1))

        # Find the `Ranked Reload` segment
        for stat in profile_data.get("stats", []):
            if "Ranked Reload" in stat.get("modeName", ""):
                # Extract the desired information
                return {
                    "currentDivisionName": stat.get("currentDivisionName"),
                    "rank": stat.get("rank"),
                    "highestRank": stat.get("highestRank"),
                }
        return {"error": "Ranked Reload data not found in profile"}
    except json.JSONDecodeError as e:
        return {"error": f"Failed to parse profile JSON: {str(e)}"}

if __name__ == "__main__":
    # Read HTML from stdin
    html = sys.stdin.read()
    result = extract_ranked_reload_info(html)
    print(json.dumps(result))
