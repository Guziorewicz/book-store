from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    id: int
    title: str
    author: str
    pages: int
    stock: int
    price: float


class Cart(BaseModel):
    user_id: int
    cart: List[Book]