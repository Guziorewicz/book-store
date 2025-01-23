from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    id: int
    title: str
    author: str
    pages: int
    stock: int
    price: float

class User(BaseModel):
    id: int
    email: str

class CartItem(BaseModel):
    book_id: int
    amount: int


class Cart(BaseModel):
    user_id: int
    cart: List[CartItem]