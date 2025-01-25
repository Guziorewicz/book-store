from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.books import book_router

'''
This is backend used to operate books data
Hosted via `uvicorn books.main:app --reload --port 8000`
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

# Register book router

app.include_router(book_router, prefix="/books", tags=["Books"])

# Test route
@app.get("/")
def read_root():
    return {"message": "Welcome to the bookstore here in the API!"}


