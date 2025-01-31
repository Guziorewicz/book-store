import { test, expect } from "vitest";
import Book from "./Book";

test("Creates a book instance correctly", () => {
    const book = new Book({ id: 1, title: "Test Book", author: "John Doe", pages: 200, stock: 5, price: 15.99 });

    expect(book.id).toBe(1);
    expect(book.title).toBe("Test Book");
    expect(book.author).toBe("John Doe");
    expect(book.pages).toBe(200);
    expect(book.stock).toBe(5);
    expect(book.price).toBe(15.99);
});

test("fromJSON creates an array of books", () => {
    const data = [
        { id: 1, title: "Book A", author: "Alice", pages: 150, stock: 3, price: 9.99 },
        { id: 2, title: "Book B", author: "Bob", pages: 200, stock: 5, price: 15.99 }
    ];

    const books = Book.fromJSON(data);

    expect(books).toHaveLength(2);
    expect(books[0]).toBeInstanceOf(Book);
    expect(books[1].title).toBe("Book B");
});

test("fromJSON returns empty array for invalid input", () => {
    expect(Book.fromJSON(null)).toEqual([]);
    expect(Book.fromJSON("invalid")).toEqual([]);
    expect(Book.fromJSON(123)).toEqual([]);
});
