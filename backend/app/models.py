from pydantic import BaseModel

class Book(BaseModel):
    title: str
    author: str
    pages: int
    stock: int
    price: float
