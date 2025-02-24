from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Fixed Credentials
FIXED_EMAIL = "admin@example.com"
FIXED_PASSWORD = "password123"

# Request Model
class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/api/login")
async def login(request: LoginRequest):
    if request.email == FIXED_EMAIL and request.password == FIXED_PASSWORD:
        return {"message": "Login successful", "token": "fake-jwt-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
