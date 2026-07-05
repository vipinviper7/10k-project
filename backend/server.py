"""Minimal API for Bites.

The app is intentionally local-first: photos are stored on-device in the
browser's IndexedDB and never uploaded. This backend only exists to satisfy
the hosting template and expose a health check.
"""
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Bites API")

api_router = APIRouter(prefix="/api")


@api_router.get("/health")
async def health():
    return {"status": "ok", "app": "bites", "storage": "client-side"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
