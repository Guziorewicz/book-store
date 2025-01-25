from fastapi import APIRouter
from models import Book
# from data import books

book_router = APIRouter()

# Get all books
@book_router.get("/")
def get_books():
    return books


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
    

