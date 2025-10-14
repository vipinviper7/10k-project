import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

sample_providers = [
    {
        "id": "provider-1",
        "name": "Bella Italia Catering",
        "description": "Authentic Italian cuisine with modern flair. Our expert chefs bring the taste of Italy to your special events.",
        "cuisines": ["Italian", "Mediterranean"],
        "specialties": ["Wood-fired Pizza", "Fresh Pasta", "Antipasti Platters", "Tiramisu"],
        "eventTypes": ["wedding", "corporate", "party"],
        "rating": 4.8,
        "pricePerGuest": 45,
        "minGuests": 20,
        "maxGuests": 300,
        "images": ["https://images.unsplash.com/photo-1671612451404-f4f8fc5fe25e?crop=entropy&cs=srgb&fm=jpg&q=85"],
        "menus": ["Classic Italian Buffet - Includes appetizers, main course, and dessert", "Premium Wedding Package - Full course meal with wine pairing"],
        "city": "San Francisco",
        "available": True,
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": "provider-2",
        "name": "Spice Route Indian Cuisine",
        "description": "Award-winning Indian catering service offering authentic flavors from across India.",
        "cuisines": ["Indian", "Asian"],
        "specialties": ["Tandoori Dishes", "Biryani", "Curry Selection", "Samosas"],
        "eventTypes": ["wedding", "corporate", "party", "birthday"],
        "rating": 4.9,
        "pricePerGuest": 38,
        "minGuests": 30,
        "maxGuests": 500,
        "images": ["https://images.unsplash.com/photo-1716187677911-298b8e551456?crop=entropy&cs=srgb&fm=jpg&q=85"],
        "menus": ["Traditional Indian Feast", "Vegetarian Deluxe Package", "Corporate Lunch Boxes"],
        "city": "San Francisco",
        "available": True,
        "created_at": "2024-01-02T00:00:00Z"
    },
    {
        "id": "provider-3",
        "name": "Tokyo Street Kitchen",
        "description": "Contemporary Japanese catering with a focus on fresh sushi and authentic ramen.",
        "cuisines": ["Japanese", "Asian"],
        "specialties": ["Sushi Platters", "Ramen Bowls", "Tempura", "Mochi Desserts"],
        "eventTypes": ["corporate", "party"],
        "rating": 4.7,
        "pricePerGuest": 55,
        "minGuests": 15,
        "maxGuests": 200,
        "images": ["https://images.unsplash.com/photo-1642781197019-bb624cfe2e3b?crop=entropy&cs=srgb&fm=jpg&q=85"],
        "menus": ["Sushi & Sashimi Selection", "Hot Ramen Station", "Bento Box Catering"],
        "city": "Los Angeles",
        "available": True,
        "created_at": "2024-01-03T00:00:00Z"
    },
    {
        "id": "provider-4",
        "name": "Fiesta Mexicana Catering",
        "description": "Vibrant Mexican cuisine perfect for any celebration. Fresh ingredients, bold flavors.",
        "cuisines": ["Mexican", "Latin"],
        "specialties": ["Tacos", "Enchiladas", "Guacamole", "Churros"],
        "eventTypes": ["wedding", "party", "birthday"],
        "rating": 4.6,
        "pricePerGuest": 35,
        "minGuests": 25,
        "maxGuests": 400,
        "images": ["https://images.pexels.com/photos/18404369/pexels-photo-18404369.jpeg"],
        "menus": ["Taco Bar Setup", "Full Mexican Buffet", "Street Food Experience"],
        "city": "Los Angeles",
        "available": True,
        "created_at": "2024-01-04T00:00:00Z"
    },
    {
        "id": "provider-5",
        "name": "Dragon Wok Catering",
        "description": "Exquisite Chinese catering featuring Cantonese and Szechuan specialties.",
        "cuisines": ["Chinese", "Asian"],
        "specialties": ["Dim Sum", "Peking Duck", "Kung Pao Chicken", "Spring Rolls"],
        "eventTypes": ["wedding", "corporate", "party"],
        "rating": 4.8,
        "pricePerGuest": 42,
        "minGuests": 20,
        "maxGuests": 350,
        "images": ["https://images.pexels.com/photos/34221549/pexels-photo-34221549.jpeg"],
        "menus": ["Dim Sum Brunch Package", "Chinese Banquet Dinner", "Corporate Lunch Special"],
        "city": "San Francisco",
        "available": True,
        "created_at": "2024-01-05T00:00:00Z"
    },
    {
        "id": "provider-6",
        "name": "All-American BBQ Co.",
        "description": "Classic American BBQ and comfort food. Perfect for casual events and celebrations.",
        "cuisines": ["American", "BBQ"],
        "specialties": ["Smoked Ribs", "Pulled Pork", "Mac & Cheese", "Coleslaw"],
        "eventTypes": ["corporate", "party", "birthday"],
        "rating": 4.7,
        "pricePerGuest": 40,
        "minGuests": 30,
        "maxGuests": 300,
        "images": ["https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?crop=entropy&cs=srgb&fm=jpg&q=85"],
        "menus": ["BBQ Pit Master Package", "Backyard BBQ Buffet", "Corporate BBQ Lunch"],
        "city": "New York",
        "available": True,
        "created_at": "2024-01-06T00:00:00Z"
    }
]

async def seed_database():
    print("Connecting to MongoDB...")
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Clear existing providers
    print("Clearing existing data...")
    await db.providers.delete_many({})
    
    # Insert sample providers
    print(f"Inserting {len(sample_providers)} sample providers...")
    await db.providers.insert_many(sample_providers)
    
    print("Database seeded successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
