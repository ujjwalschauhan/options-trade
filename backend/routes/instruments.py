from fastapi import APIRouter

router = APIRouter()

# Hardcoded instruments for now (replace with DB/API later)
INSTRUMENTS = [
    "NIFTY-Feb2025-22900-CE",
    "NIFTY-Mar2025-23000-PE",
    "BANKNIFTY-Feb2025-45000-CE",
    "BANKNIFTY-Apr2025-44000-PE"
]

@router.get("/api/instruments")
async def get_instruments():
    return INSTRUMENTS
