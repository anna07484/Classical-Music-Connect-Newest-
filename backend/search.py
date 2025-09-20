from exa_py import Exa
from cerebras.cloud.sdk import Cerebras

from pathlib import Path

def read_secret(name: str) -> str:
    path = Path(f"/run/secrets/{name}")
    if path.exists():
        return path.read_text().strip()
    else:
        return ""

# Load API keys from Docker secrets
EXA_API_KEY = read_secret("exa_api_key")
CEREBRAS_API_KEY = read_secret("cerebrus_api_key")

client = Cerebras(api_key = CEREBRAS_API_KEY)
exa = Exa(api_key = EXA_API_KEY)

print("✅ Setup complete")

def search_web(query, num=5):
    """Search the web using Exa's auto search"""
    result = exa.search_and_contents(
      query,
      type = "auto",
      num_results = num,
      text={"max_characters": 1000}
    )
    return result.results

print("✅ Search function ready")

def ask_ai(prompt):
    """Get AI response from Cerebras"""
    chat_completion = client.chat.completions.create(
      messages=[
          {
              "role": "user",
              "content": prompt,
          }
      ],
      model="llama-4-scout-17b-16e-instruct",
      max_tokens = 600,
      temperature = 0.2
    )
    return chat_completion.choices[0].message.content

print("✅ AI function ready")

import uuid
import json

import re

def safe_parse_events(ai_response, city):
    try:
        # Extract the first JSON array from the response
        match = re.search(r"\[.*\]", ai_response, re.DOTALL)
        if match:
            events = json.loads(match.group(0))
        else:
            raise ValueError("No JSON array found")

        # Ensure IDs are present
        for e in events:
            if not e.get("id"):
                e["id"] = str(uuid.uuid4())

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
            "beginnerFriendly": True
        }]

def search_events(city: str, num_events: int = 3):
    """Generate structured event cards for classical music events in a given city."""

    # Step 1: Search the web for classical music events
    query = f"classical music concerts and recitals in {city} upcoming 2025"
    results = exa.search_and_contents(
        query,
        type="auto",
        num_results=num_events,
        text={"max_characters": 1200}
    )

    # Step 2: Build context for AI
    context = f"Extract upcoming classical music concerts or recitals in {city} from the following sources:\n\n"
    for r in results.results[:num_events]:
        context += f"- {r.title}: {r.text[:400]}...\n\n"

    # Step 3: Ask AI to convert into structured Event objects
    prompt = f"""{context}

Respond ONLY with a valid JSON array of Event objects that matches this schema:

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
    "beginnerFriendly": true | false
  }}
]
"""

    ai_response = ask_ai(prompt)
    events = safe_parse_events(ai_response, city)
    return events


print(search_events("Cincinnati"))