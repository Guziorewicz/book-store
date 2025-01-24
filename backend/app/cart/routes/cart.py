from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Cart, Book
from ..data import users, carts

cart_router = APIRouter()


# Find cart or create new
@cart_router.get("/{user_id}")
def get_cart(user_id: int):
    user_cart = next((cart for cart in carts if cart["user_id"] == user_id), None)
    if user_cart is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user_cart

# Add order to cart
@cart_router.post("/{user_id}/add")
def update_cart(user_id: int, order: Book):
    # Find cart
    user_cart = next((cart for cart in carts if cart["user_id"] == user_id), None)
    # Add Books
    user_cart["cart"].append(order)
    return {"Books added to cart"}


# Delete from cart ---- do zrobienia na razie jest 422 nie przyjmuje tematu 
# w funkcji brakuje usunięcia z listy huehueheueheueh
@cart_router.post("/{user_id}/remove")
def remove_from_cart(user_id: int, item: Book):
    # Find cart
    user_cart = next((cart for cart in carts if cart["user_id"] == user_id), None)
    if not user_cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    # Find position
    item_to_delete = next((item for item in user_cart["cart"] if item["title"] == item["title"] and item["stock"] == item["stock"]), None)
    if not item_to_delete:
        raise HTTPException(status_code=404, detail="Position not found")
    # Remove item
    user_cart["cart"].remove(item_to_delete)

    return {"Position removed"}



# # Get books from cart
# @cart_router.get("/books/{user_id}")
# def get_cart_order(user_id: int):
#     ...


# # Post Cart
# # Find book by id
# def find_book_by_id(book_id: int) -> Book:
#     return next((book for book in books if book["id"] == book_id), None)




# @cart_router.post("/{user_id}")
# def update_cart(user_id: int, book_id: int, amount: int):
#     # Find book by id
#     book = find_book_by_id(book_id)
#     if book is None:
#         raise HTTPException(status_code=404, detail="Book not found")

#     # Check stock avaliablity
#     if book["stock"] < amount:
#         raise HTTPException(status=400, detail="Not enough stock avaliable")

#     # Get user's cart
#     cart = get_or_create_cart(user_id)

#     # Check if the book is already in cart
#     cart_item = next((item for item in cart["cart"] if item["book_id"] == book_id), None)
#     if cart_item:
#         cart_item.amount += amount
#     else: 
#         cart["cart"].append(CartItem(book_id=book_id, amount=amount))

#     # Update stock
#     book["stock"] -= amount

#     return cart

# # Delete Cart

# @cart_router.delete("/{user_id}")
# def remove_book_from_cart(user_id: int, book_id: int, amount: int):
#     # Find the user's cart
#     cart = get_or_create_cart(user_id)

#     # Find the book in cart
#     book_to_delete = next((book for book in cart["cart"] if book["book_id"] == book_id), None)

#     # In case that somehow there is no book in the cart :)
#     if book_to_delete is None:
#         raise HTTPException(status_code=404, detail="Book not found in cart")

#     # Remove book
#     cart["cart"].remove(book_to_delete)

#     # Update stock
#     # Find book by id
#     book = find_book_by_id(book_id)
#     if book is None:
#         raise HTTPException(status_code=404, detail="Book not found in inventory")

#     # Append books from cart
#     book["stock"] += amount


#     return {"message": f"Book with ID {book_id} removed from cart", "cart": cart}