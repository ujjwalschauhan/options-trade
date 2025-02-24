import os
import requests
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

DHAN_CLIENT_ID = os.getenv("DHAN_CLIENT_ID")
DHAN_ACCESS_TOKEN = os.getenv("DHAN_ACCESS_TOKEN")

DHAN_API_URL = "https://api.dhan.co/marketfeed/ltp"

headers = {
    "Content-Type": "application/json",
    "X-Dhan-Client-Id": DHAN_CLIENT_ID,
    "Authorization": f"Bearer {DHAN_ACCESS_TOKEN}"
}

@router.get("/api/ltp/{security_id}")
async def get_ltp(security_id: str):
    """Fetch LTP (Last Traded Price) for a given security_id from Dhan API"""
    try:
        payload = {"instruments": [{"securityId": security_id}]}
        response = requests.post(DHAN_API_URL, headers=headers, json=payload)

        if response.status_code == 200:
            data = response.json()
            ltp = data["data"][0]["ltp"]  # Extract LTP from response
            return {"security_id": security_id, "ltp": ltp}
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch LTP from Dhan")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
