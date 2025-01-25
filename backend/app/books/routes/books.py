from bson.objectid import ObjectId
from fastapi import APIRouter, Depends
from pymongo.database import Database
from models import Book

book_router = APIRouter()


# Get global db
def get_db() -> Database:
    from main import db
    return db


# Convert MongoDB docs to JSON
def serialize_book(book):
    return {
        "id": str(book["_id"]),
        "title": book["title"],
        "author": book["author"],
        "pages": book["pages"],
        "stock": book["stock"],
        "price": book["price"],
    }

# Get all books
@book_router.get("/")
def get_books(db: Database = Depends(get_db)):
    # Get books
    books = db.books.find()
    # Serialize each book
    return [serialize_book(book) for book in books]




# Check book in stock and make reservation
@book_router.get("/state")
def check_stock(id: int, amount: int):
    # Find a book
    position = next((item for item in books if item["id"] == id), None)
    if position is None:
        return {"error": "Book not found"}
    # Check amount in stock
    if position["stock"] < amount:
        return {"error": "Not enough books in stock"}
    # Reserve books
    position["stock"] -= amount
    position["reservated"] += amount
    return {"Books reserved in stock"}
    

