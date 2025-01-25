import httpx
from fastapi import HTTPException

async def check_books(book_id: int, amount: int):
    async with httpx.AsyncClient() as client:
        response = await client.post("http://fastapi-books:8000/books/check", json={
            "book_id": book_id,
            "amount": amount
        })

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json().get("detail", "Unknown error"))

    return response.json()

async def release_books(book_id: int, amount: int):
    async with httpx.AsyncClient() as client:
        response = await client.post("http://fastapi-books:8000/books/release", json={
            "book_id": book_id,
            "amount": amount
        })

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json().get("detail", "Unknown error"))

    return response.json()