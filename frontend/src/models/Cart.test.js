import { test, expect } from "vitest";
import Cart from "./Cart";
import Book from "./Book";

test("Creates a cart instance correctly", () => {
    const books = [
        new Book({ id: 1, title: "Book A", author: "Alice", pages: 150, stock: 3, price: 9.99 }),
        new Book({ id: 2, title: "Book B", author: "Bob", pages: 200, stock: 2, price: 15.99 })
    ];

    const cart = new Cart(1, books);

    expect(cart.user_id).toBe(1);
    expect(cart.cart).toHaveLength(2);
    expect(cart.cart[0]).toBeInstanceOf(Book);
});

test("Calculates total price correctly", () => {
    const books = [
        new Book({ id: 1, title: "Book A", author: "Alice", pages: 150, stock: 3, price: 10 }),
        new Book({ id: 2, title: "Book B", author: "Bob", pages: 200, stock: 2, price: 15 })
    ];

    const cart = new Cart(1, books);

    expect(cart.getTotalPrice()).toBe("60.00");
});

test("Returns 0 total price for empty cart", () => {
    const cart = new Cart(1, []);
    expect(cart.getTotalPrice()).toBe("0.00");
});

test("fromJSON converts raw data into a Cart instance", () => {
    const data = {
        user_id: 1,
        cart: [
            { id: 1, title: "Book A", author: "Alice", pages: 150, stock: 3, price: 10 },
            { id: 2, title: "Book B", author: "Bob", pages: 200, stock: 2, price: 15 }
        ]
    };

    const cart = Cart.fromJSON(data);

    expect(cart).toBeInstanceOf(Cart);
    expect(cart.cart).toHaveLength(2);
    expect(cart.getTotalPrice()).toBe("60.00");
});

test("fromJSON handles invalid data", () => {
    expect(Cart.fromJSON(null)).toBeInstanceOf(Cart);
    expect(Cart.fromJSON({})).toBeInstanceOf(Cart);
    expect(Cart.fromJSON({ user_id: 5, cart: "invalid" })).toBeInstanceOf(Cart);
});
