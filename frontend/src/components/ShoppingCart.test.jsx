import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";
import { useCart } from "../context/CartContext";
import { useBooks } from "../context/BooksContext";
import { test, expect, vi } from "vitest";

// Mock DeleteFromCart modal
vi.mock("./ItemDeletion", () => ({
    default: ({ isOpen, onClose, onConfirm, title }) =>
        isOpen ? (
            <div role="dialog">
                <p>Removing: {title}</p>
                <button onClick={onClose}>X</button>
                <button onClick={onConfirm}>Remove from cart</button>
            </div>
        ) : null,
}));

// Mock Context
vi.mock("../context/CartContext", () => ({
    useCart: vi.fn(),
}));

vi.mock("../context/BooksContext", () => ({
    useBooks: vi.fn(),
}));

// Mock Data
const mockCart = {
    cart: [
        { id: 1, title: "Book A", author: "Author A", stock: 2, price: 20.99 },
        { id: 2, title: "Book B", author: "Author B", stock: 1, price: 15.99 },
    ],
    getTotalPrice: () => 36.98, 
};

const renderShoppingCart = () => {
    render(<ShoppingCart />);
};

test("renders shopping cart with correct data", () => {
    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: vi.fn() });
    useBooks.mockReturnValue({ setBooks: vi.fn() });

    renderShoppingCart();

    expect(screen.getByText("Book A")).toBeInTheDocument();
    expect(screen.getByText("Book B")).toBeInTheDocument();
});

test("displays correct cart item details", () => {
    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: vi.fn() });
    useBooks.mockReturnValue({ setBooks: vi.fn() });

    renderShoppingCart();

    expect(screen.getByText("Author A")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("20.99 €")).toBeInTheDocument();
});

test("opens DeleteFromCart modal when clicking remove", async () => {
    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: vi.fn() });
    useBooks.mockReturnValue({ setBooks: vi.fn() });

    renderShoppingCart();

    fireEvent.click(screen.getAllByRole("button", { name: /Remove/i })[0]);

    await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Removing: Book A")).toBeInTheDocument();
    });
});

test("removes item from cart when confirmed", async () => {
    const removeMock = vi.fn();
    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: removeMock });
    useBooks.mockReturnValue({ setBooks: vi.fn() });

    renderShoppingCart();

    fireEvent.click(screen.getAllByRole("button", { name: /Remove/i })[0]);

    await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const confirmButton = screen.getByText("Remove from cart");

    await act(async () => {
        fireEvent.click(confirmButton);
    });

    await waitFor(() => {
        expect(removeMock).toHaveBeenCalledTimes(1);
    });
});

test("updates book stock when item is removed", async () => {
    const removeMock = vi.fn();
    const setBooksMock = vi.fn();

    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: removeMock });
    useBooks.mockReturnValue({ setBooks: setBooksMock });

    renderShoppingCart();

    fireEvent.click(screen.getAllByRole("button", { name: /Remove/i })[0]);

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const confirmButton = screen.getByText("Remove from cart");

    await act(async () => {
        fireEvent.click(confirmButton);
    });

    await waitFor(() => {
        expect(removeMock).toHaveBeenCalledTimes(1);
        expect(setBooksMock).toHaveBeenCalledTimes(1);
    });
});

test("toggles delivery state when clicking Make order", async () => {
    useCart.mockReturnValue({ cart: mockCart, removeFromCartHandler: vi.fn() });
    useBooks.mockReturnValue({ setBooks: vi.fn() });

    renderShoppingCart();

    const orderButton = screen.getByText("Make order");
    fireEvent.click(orderButton);

    await act(async () => {
        expect(screen.getByText("UPCOMING")).toBeInTheDocument();
    });
});
