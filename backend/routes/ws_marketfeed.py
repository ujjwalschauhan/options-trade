import os
import asyncio
import websockets
import json
from fastapi import APIRouter, WebSocket
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

DHAN_CLIENT_ID = os.getenv("DHAN_CLIENT_ID")
DHAN_ACCESS_TOKEN = os.getenv("DHAN_ACCESS_TOKEN")

DHAN_WS_URL = "wss://api.dhan.co/marketfeed/ws"  # WebSocket URL

@router.websocket("/api/ws/marketfeed")
async def marketfeed_ws(websocket: WebSocket):
    await websocket.accept()

    async with websockets.connect(DHAN_WS_URL) as ws:
        # Authenticate WebSocket Connection
        auth_payload = {
            "client_id": DHAN_CLIENT_ID,
            "access_token": DHAN_ACCESS_TOKEN
        }
        await ws.send(json.dumps(auth_payload))

        while True:
            try:
                # Receive instrument ID from frontend
                data = await websocket.receive_text()
                request_data = json.loads(data)
                security_id = request_data.get("security_id")

                if not security_id:
                    await websocket.send_text(json.dumps({"error": "Missing security_id"}))
                    continue

                # Subscribe to LTP updates for the security
                subscribe_payload = {
                    "action": "subscribe",
                    "instruments": [{"securityId": security_id}]
                }
                await ws.send(json.dumps(subscribe_payload))

                # Listen for LTP updates and send to frontend
                while True:
                    response = await ws.recv()
                    response_data = json.loads(response)
                    await websocket.send_text(json.dumps(response_data))

            except Exception as e:
                print(f"Error in WebSocket: {str(e)}")
                break
