from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: str = "user"  # user or provider
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Provider(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    cuisines: List[str]
    specialties: List[str]
    eventTypes: List[str]
    rating: float = 4.5
    pricePerGuest: int
    minGuests: int = 20
    maxGuests: int = 500
    images: List[str]
    menus: List[str]
    city: str
    available: bool = True
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProviderCreate(BaseModel):
    name: str
    description: str
    cuisines: List[str]
    specialties: List[str]
    eventTypes: List[str]
    pricePerGuest: int
    minGuests: int = 20
    maxGuests: int = 500
    images: List[str]
    menus: List[str]
    city: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_name: str
    provider_id: str
    provider_name: str
    date: str
    time: str
    guests: int
    event_type: str
    status: str = "pending"  # pending, confirmed, cancelled
    price: int
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BookingCreate(BaseModel):
    provider_id: str
    date: str
    time: str
    guests: int
    event_type: str

class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_id: str
    sender_id: str
    sender_name: str
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class MessageCreate(BaseModel):
    booking_id: str
    message: str

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return User(**user)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Auth Routes
@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_obj = User(
        name=user_data.name,
        email=user_data.email,
        role=user_data.role
    )
    user_dict = user_obj.model_dump()
    user_dict["password_hash"] = hash_password(user_data.password)
    
    await db.users.insert_one(user_dict)
    
    # Create token
    access_token = create_access_token(data={"sub": user_obj.id, "email": user_obj.email})
    
    return {
        "user": user_obj,
        "access_token": access_token,
        "token_type": "bearer"
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    user_obj = User(**user)
    access_token = create_access_token(data={"sub": user_obj.id, "email": user_obj.email})
    
    return {
        "user": user_obj,
        "access_token": access_token,
        "token_type": "bearer"
    }

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Provider Routes
@api_router.get("/providers", response_model=List[Provider])
async def get_providers(
    cuisine: Optional[str] = None,
    eventType: Optional[str] = None,
    city: Optional[str] = None,
    minPrice: Optional[int] = None,
    maxPrice: Optional[int] = None,
    minGuests: Optional[int] = None
):
    query = {"available": True}
    
    if cuisine:
        query["cuisines"] = {"$in": [cuisine]}
    if eventType:
        query["eventTypes"] = {"$in": [eventType]}
    if city:
        query["city"] = city
    if minPrice:
        query["pricePerGuest"] = {"$gte": minPrice}
    if maxPrice:
        if "pricePerGuest" in query:
            query["pricePerGuest"]["$lte"] = maxPrice
        else:
            query["pricePerGuest"] = {"$lte": maxPrice}
    if minGuests:
        query["maxGuests"] = {"$gte": minGuests}
    
    providers = await db.providers.find(query, {"_id": 0}).to_list(1000)
    return providers

@api_router.get("/providers/{provider_id}", response_model=Provider)
async def get_provider(provider_id: str):
    provider = await db.providers.find_one({"id": provider_id}, {"_id": 0})
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    return Provider(**provider)

@api_router.post("/providers", response_model=Provider)
async def create_provider(provider_data: ProviderCreate, current_user: User = Depends(get_current_user)):
    provider_obj = Provider(**provider_data.model_dump())
    provider_dict = provider_obj.model_dump()
    
    await db.providers.insert_one(provider_dict)
    return provider_obj

# Booking Routes
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate, current_user: User = Depends(get_current_user)):
    # Get provider
    provider = await db.providers.find_one({"id": booking_data.provider_id}, {"_id": 0})
    if not provider:
        raise HTTPException(status_code=404, detail="Provider not found")
    
    # Calculate price
    price = provider["pricePerGuest"] * booking_data.guests
    
    booking_obj = Booking(
        user_id=current_user.id,
        user_name=current_user.name,
        provider_id=booking_data.provider_id,
        provider_name=provider["name"],
        date=booking_data.date,
        time=booking_data.time,
        guests=booking_data.guests,
        event_type=booking_data.event_type,
        price=price
    )
    
    booking_dict = booking_obj.model_dump()
    await db.bookings.insert_one(booking_dict)
    
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(current_user: User = Depends(get_current_user)):
    bookings = await db.bookings.find({"user_id": current_user.id}, {"_id": 0}).to_list(1000)
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str, current_user: User = Depends(get_current_user)):
    booking = await db.bookings.find_one({"id": booking_id, "user_id": current_user.id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return Booking(**booking)

@api_router.patch("/bookings/{booking_id}")
async def update_booking(booking_id: str, status: str, current_user: User = Depends(get_current_user)):
    result = await db.bookings.update_one(
        {"id": booking_id, "user_id": current_user.id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking updated"}

# Message Routes
@api_router.post("/messages", response_model=Message)
async def create_message(message_data: MessageCreate, current_user: User = Depends(get_current_user)):
    # Verify booking exists
    booking = await db.bookings.find_one({"id": message_data.booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    message_obj = Message(
        booking_id=message_data.booking_id,
        sender_id=current_user.id,
        sender_name=current_user.name,
        message=message_data.message
    )
    
    message_dict = message_obj.model_dump()
    await db.messages.insert_one(message_dict)
    
    return message_obj

@api_router.get("/messages/{booking_id}", response_model=List[Message])
async def get_messages(booking_id: str, current_user: User = Depends(get_current_user)):
    # Verify user has access to this booking
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking or booking["user_id"] != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    messages = await db.messages.find({"booking_id": booking_id}, {"_id": 0}).to_list(1000)
    return messages

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()