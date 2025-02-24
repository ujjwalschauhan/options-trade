from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import instruments, marketfeed, ws_marketfeed

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(instruments.router)   # Instruments API (MongoDB)
app.include_router(marketfeed.router)    # LTP Fetch (Dhan API)
app.include_router(ws_marketfeed.router) # WebSocket for real-time LTP

@app.get("/")
def read_root():
    return {"message": "Stock Trading API is Running 🚀"}
