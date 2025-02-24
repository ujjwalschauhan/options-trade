from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "tradeDB")

client = AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]
trade_collection = database["trades"]
