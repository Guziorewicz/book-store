from bson.objectid import ObjectId
from fastapi import APIRouter, Depends
from pymongo.database import Database
from models import Book, CheckReserveRequest

book_router = APIRouter()


# Get global db
def get_db() -> Database:
    from main import db
    return db


# Convert MongoDB docs to JSON
def serialize_book(book):
    return {
        "id": book["id"],
        "title": book["title"],
        "author": book["author"],
        "pages": book["pages"],
        "stock": book["stock"],
        "price": book["price"],
        "reservated": book["reservated"],
    }

# Get all books
@book_router.get("/")
def get_books(db: Database = Depends(get_db)):
    # Get books
    books = db.books.find()
    # Serialize each book
    return [serialize_book(book) for book in books]


@book_router.post("/check")
def check_and_reserve(request: CheckReserveRequest, db: Database = Depends(get_db)):
    # Find a book
    book = db.books.find_one({"id": request.book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    # Check stock
    if book["stock"] < request.amount:
        raise HTTPException(status_code=400, detail="Not enough books in stock")

    # Make reservation
    db.books.update_one(
        {"id": request.book_id},
        {"$inc": {"stock": -request.amount, "reservated": request.amount}}
    )

    return {"status": "OK", "message": "Books reserved"}


@book_router.post("/release")
def release_books(request: CheckReserveRequest, db: Database = Depends(get_db)):
    # Check if position exists
    book = db.books.find_one({"id": request.book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    # Check amount
    if book["reservated"] < request.amount:
        raise HTTPException(status_code=400, detail="Not enough books reserved")

    # Update stock and reservation
    db.books.update_one(
        {"id": request.book_id},
        {"$inc": {"stock": request.amount, "reservated": -request.amount}}
    )

    return {"status": "OK", "message": "Books released"}


# # Check book in stock and make reservation
# @book_router.get("/state")
# def check_stock(id: int, amount: int):
#     # Find a book
#     position = next((item for item in books if item["id"] == id), None)
#     if position is None:
#         return {"error": "Book not found"}
#     # Check amount in stock
#     if position["stock"] < amount:
#         return {"error": "Not enough books in stock"}
#     # Reserve books
#     position["stock"] -= amount
#     position["reservated"] += amount
#     return {"Books reserved in stock"}
    

