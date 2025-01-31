import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import HomePage from "./HomePage";
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";
import { test, expect, vi } from "vitest";
import Book from "../models/Book";
import Cart from "../models/Cart";

// Mock API Calls
vi.mock("../api/books", () => ({
    fetchBooks: vi.fn(),
}));

vi.mock("../api/orders", () => ({
    fetchOrder: vi.fn(),
    addOrderToCart: vi.fn(),
    removeFromCart: vi.fn(),
}));

// Mock Contexts
vi.mock("../context/BooksContext", () => ({
    useBooks: vi.fn(),
}));

vi.mock("../context/CartContext", () => ({
    useCart: vi.fn(),
}));

// Test Data
const mockBooks = [
    new Book({ id: 1, title: "Book A", author: "Author A", pages: 300, stock: 3, price: 19.99 }),
    new Book({ id: 2, title: "Book B", author: "Author B", pages: 250, stock: 2, price: 15.99 }),
];

const mockCart = new Cart(1, [
    new Book({ id: 1, title: "Book A", author: "Author A", stock: 1, price: 19.99 }),
]);

const setBooksMock = vi.fn();
const removeMock = vi.fn();
const addMock = vi.fn();

const renderHomePage = () => {
    useBooks.mockReturnValue({ books: mockBooks, getBooks: vi.fn(), setBooks: setBooksMock });
    useCart.mockReturnValue({ cart: mockCart, getCart: vi.fn(), removeFromCartHandler: removeMock, addToCart: addMock });

    render(<HomePage />);
};

test("renders HomePage with Books and ShoppingCart", async () => {
    renderHomePage();

    const bookList = screen.getByText("Books list").closest("div");
    expect(bookList).toBeInTheDocument();
    
    const shoppingCart = screen.getByText("Your order").closest("div");
    expect(shoppingCart).toBeInTheDocument();

    expect(within(bookList).getByText("Book A")).toBeInTheDocument();
    expect(within(bookList).getByText("Book B")).toBeInTheDocument();

    expect(within(shoppingCart).getByText("Book A")).toBeInTheDocument();

    const allPrices = screen.getAllByText("19.99 €");
    
    const cartPrice = allPrices.find(price => shoppingCart.contains(price));
    expect(cartPrice).toBeInTheDocument();
});

test("calls getBooks and getCart on mount", async () => {
    const getBooksMock = vi.fn();
    const getCartMock = vi.fn();

    useBooks.mockReturnValue({ books: [], getBooks: getBooksMock, setBooks: setBooksMock });
    useCart.mockReturnValue({ cart: new Cart(1, []), getCart: getCartMock, removeFromCartHandler: removeMock });

    render(<HomePage />);

    await waitFor(() => {
        expect(getBooksMock).toHaveBeenCalledTimes(1);
        expect(getCartMock).toHaveBeenCalledTimes(1);
    });
});

test("removes item from cart when confirmed", async () => {
    renderHomePage();

    fireEvent.click(screen.getAllByRole("button", { name: /Remove/i })[0]);

    await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Remove from cart"));

    await waitFor(() => {
        expect(removeMock).toHaveBeenCalledTimes(1);
    });
});

test("adds item to cart when confirmed", async () => {
    renderHomePage();

    const bookList = screen.getByText("Books list").closest("div");
    
    const addToCartButton = within(bookList).getByRole("button", { name: /Add Book A to Cart/i });
    fireEvent.click(addToCartButton);

    const confirmButton = screen.getByText("✔ Add to cart");
    fireEvent.click(confirmButton);

    await waitFor(() => {
        expect(addMock).toHaveBeenCalledTimes(1);
    });
});
