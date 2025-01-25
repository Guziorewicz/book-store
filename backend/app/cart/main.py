from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.cart import cart_router

'''
This is backend used to operate books data
Hosted via `uvicorn cart.main:app --reload --port 8001`
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

# Register cart router
app.include_router(cart_router, prefix="/cart", tags=["Cart"])

# Test route
@app.get("/")
def read_root():
    return {"message": "Welcome to the bookstore API!"}