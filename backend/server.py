from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from search import search_events  # import your Python search function

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # during dev, open up; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search")
def search(q: str = "classical concerts"):
    results = search_events(q)
    return results
