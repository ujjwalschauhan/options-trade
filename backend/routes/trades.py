from fastapi import APIRouter, HTTPException
from models import TradeRequest
from database import trade_collection

router = APIRouter()

@router.post("/api/trade/submit")
async def submit_trade(trade: TradeRequest):
    trade_dict = trade.dict()
    result = await trade_collection.insert_one(trade_dict)
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save trade")
    return {"message": "Trade submitted successfully", "trade_id": str(result.inserted_id)}

@router.get("/api/trade/history")
async def get_trade_history():
    trades = await trade_collection.find().to_list(50)  # Limit 50 trades
    return trades
