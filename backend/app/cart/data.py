from .models import Book

users = [
  {
    "id" : 1,
    "email": "jameson@mail.com"
  },
  {
    "id": 2,
    "email": "max@mail.com"
  }
]

carts = [
 {
        "user_id": 1,
        "cart": [
            Book(id=1, title="The Pragmatic Programmer", author="Andrew Hunt", pages=352, stock=3, price=45.99)
        ]
    },
  {
    "user_id": 2,
    "cart": []
  }
]