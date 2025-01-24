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
    if user_cart is None:
        raise HTTPException(status_code=404, detail="Cart not found")

    # Check if book is already in cart 
    book_in_cart = next((item for item in user_cart["cart"] if item.id == order.id), None)

    if book_in_cart is None:
        # Add Books
        user_cart["cart"].append(order)
        print("new")

    else:
        book_in_cart.stock += order.stock
        print("found")

    return {"Books added to cart"}


# Delete from cart 
@cart_router.post("/{user_id}/remove")
def remove_from_cart(user_id: int, item: Book):
    # Find cart
    user_cart = next((cart for cart in carts if cart["user_id"] == user_id), None)
    if not user_cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    # Find position
    item_to_delete = next((position for position in user_cart["cart"] if position.id == item.id), None)
    if not item_to_delete:
        raise HTTPException(status_code=404, detail="Position not found")

    # Remove item
    user_cart["cart"].remove(item_to_delete)

    return {"Position removed"}

