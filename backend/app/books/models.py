from pydantic import BaseModel

class Book(BaseModel):
    id: int
    title: str
    author: str
    pages: int
    stock: int
    price: float
    reservated: int

