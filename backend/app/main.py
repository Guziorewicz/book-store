from fastapi import FastAPI
from routes.books import book_router

app = FastAPI()

# Register book router

app.include_router(book_router, prefix="/books", tags=["Books"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the bookstore API!"}