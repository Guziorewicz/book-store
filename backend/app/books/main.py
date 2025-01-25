import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routes.books import book_router

'''
This is backend used to operate books data in Mongo
Hosted on Docker contaner on localhost:8007
'''

app = FastAPI()

# Config CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mongodb connection
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)
db = client["books"]

# Register book router

app.include_router(book_router, prefix="/books", tags=["Books"])

# Test route
@app.get("/")
def read_root():
    return {"message": "Welcome to the bookstore here in the API!"}


