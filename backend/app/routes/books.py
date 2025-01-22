from fastapi import APIRouter
from models import Book
from data import books

book_router = APIRouter()

# Get all books
@book_router.get("/")
def get_books():
    return books

# Get book by title
@book_router.get("/{title}")
def get_book(title:str):
    book = next((b for b in books if b["title"] == title), None)
    if not book:
        return {"error": "Book not found"}
    return book
