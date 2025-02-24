from pydantic import BaseModel
from datetime import datetime

class TradeRequest(BaseModel):
    security_id: str
    ltp: float
    stop_loss: float
    target1: float
    target2: float
    timestamp: datetime = datetime.utcnow()
