db = db.getSiblingDB('users');
db.users.insertMany([
    {
        "id": 1,
        "email": "jameson@mail.com"
    },
    {
        "id": 2,
        "email": "max@mail.com"
    }
]);

db = db.getSiblingDB('carts');
db.carts.insertMany([
    {
        "user_id": 1,
        "cart": [
            {
                "id": 1,
        "title": "The Pragmatic Programmer",
        "author": "Andrew Hunt",
        "stock": 3,
        "price": 45.99
    }
    ]
},
{
    "user_id": 2,
    "cart": []
}
]);

db = db.getSiblingDB('books');
db.books.insertMany([
    {
    "id": 1,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "pages": 352,
    "stock": 12,
    "price": 45.99,
    "reservated": 3
},
{
    "id": 2,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "pages": 464,
    "stock": 8,
    "price": 39.99,
    "reservated": 0
},
{
    "id": 3,
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "pages": 1312,
    "stock": 5,
    "price": 89.95,
    "reservated": 0
},
{
    "id": 4,
    "title": "Design Patterns",
    "author": "Erich Gamma",
    "pages": 416,
    "stock": 7,
    "price": 54.95,
    "reservated": 0
},
{
    "id": 5,
    "title": "The Art of Computer Programming",
    "author": "Donald Knuth",
    "pages": 672,
    "stock": 3,
    "price": 199.99,
    "reservated": 0
},
{
    "id": 6,
    "title": "You Don't Know JS",
    "author": "Kyle Simpson",
    "pages": 298,
    "stock": 20,
    "price": 29.99,
    "reservated": 0
},
{
    "id": 7,
    "title": "Head First Design Patterns",
    "author": "Eric Freeman",
    "pages": 694,
    "stock": 15,
    "price": 49.99,
    "reservated": 0
},
{
    "id": 8,
    "title": "Python Crash Course",
    "author": "Eric Matthes",
    "pages": 544,
    "stock": 18,
    "price": 39.95,
    "reservated": 0
},
{
    "id": 9,
    "title": "Grokking Algorithms",
    "author": "Aditya Bhargava",
    "pages": 256,
    "stock": 10,
    "price": 34.99,
    "reservated": 0
},
{
    "id": 10,
    "title": "Refactoring",
    "author": "Martin Fowler",
    "pages": 448,
    "stock": 6,
    "price": 47.95,
    "reservated": 0
}
]);