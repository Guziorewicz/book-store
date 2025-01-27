import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routes.cart import cart_router

'''
This is backend used to operate cart data in Mongo
Hosted on Docker contaner on localhost:8009
'''

app = FastAPI()

# Config CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://front-store:5173", "http://localhost:5173", "http://localhost:5555"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mongodb connection
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)
db = client["carts"]

# Register cart router
app.include_router(cart_router, prefix="/cart", tags=["Cart"])

# Test route
@app.get("/")
def read_root():
    return {"message": "Welcome to the bookstore API!"}