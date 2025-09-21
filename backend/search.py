from exa_py import Exa
from cerebras.cloud.sdk import Cerebras
from pathlib import Path
import uuid
import json
import re

def read_secret(name: str) -> str:
    path = Path(f"/run/secrets/{name}")
    return path.read_text().strip() if path.exists() else ""

# Load API keys from Docker secrets
EXA_API_KEY = read_secret("exa_api_key")
CEREBRAS_API_KEY = read_secret("cerebras_api_key")

client = Cerebras(api_key=CEREBRAS_API_KEY)
exa = Exa(api_key=EXA_API_KEY)

print("✅ Setup complete")

def ask_ai(prompt: str) -> str:
    """Get AI response from Cerebras"""
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-4-scout-17b-16e-instruct",
        max_tokens=800,
        temperature=0.2
    )
    return chat_completion.choices[0].message.content

def safe_parse_events(ai_response: str, city: str):
    try:
        # Extract JSON array
        match = re.search(r"\[.*\]", ai_response, re.DOTALL)
        if match:
            events = json.loads(match.group(0))
        else:
            raise ValueError("No JSON array found")

        # Ensure required fields + UUIDs
        for e in events:
            if not e.get("id"):
                e["id"] = str(uuid.uuid4())

            # Ensure beginnerNotes is optional but structured if present
            if "beginnersNotes" in e:
                bn = e["beginnersNotes"]
                e["beginnersNotes"] = {
                    "context": bn.get("context", ""),
                    "listenFor": bn.get("listenFor", ""),
                    "funFact": bn.get("funFact", "")
                }

        return events

    except Exception as e:
        print(f"⚠️ Failed to parse AI response: {e}")
        return [{
            "id": str(uuid.uuid4()),
            "title": f"Classical Concert in {city}",
            "date": "TBD",
            "time": "TBD",
            "venue": "Unknown",
            "priceType": "ticketed",
            "price": "TBD",
            "program": ["TBD"],
            "category": "concert",
            "beginnerFriendly": True,
            "beginnersNotes": {
                "context": "Introductory placeholder",
                "listenFor": "TBD",
                "funFact": "TBD"
            }
        }]

def search_events(city: str, num_events: int = 3):
    """Generate structured event cards in the new Event format."""
    query = f"classical music concerts and recitals in {city} upcoming 2025"
    results = exa.search_and_contents(
        query,
        type="auto",
        num_results=num_events,
        text={"max_characters": 1200}
    )

    # Build AI prompt with schema
    context = f"Extract upcoming classical music concerts or recitals in {city} from these sources:\n\n"
    for r in results.results[:num_events]:
        context += f"- {r.title}: {r.text[:400]}...\n\n"

    prompt = f"""{context}

Respond ONLY with a valid JSON array of Event objects in this schema:

[
  {{
    "id": "uuid string",
    "title": "string",
    "date": "YYYY-MM-DD or 'TBD'",
    "time": "HH:MM or 'TBD'",
    "venue": "string",
    "priceType": "free" | "ticketed",
    "price": "string (optional, required if ticketed)",
    "program": ["string"],
    "category": "concert" | "recital",
    "beginnerFriendly": true | false,
    "beginnersNotes": {{
      "context": "string",
      "listenFor": "string",
      "funFact": "string"
    }}
  }}
]

- The "beginnersNotes" field is OPTIONAL.
- If included, it must have all three subfields: context, listenFor, funFact.
"""

    ai_response = ask_ai(prompt)
    return safe_parse_events(ai_response, city)


if __name__ == "__main__":
    print(search_events("Cincinnati"))
