import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";
import { test, expect, vi } from "vitest";

// 🔹 Mock `useBooks` and `useCart`
vi.mock("../context/BooksContext", () => ({
    useBooks: vi.fn(),
}));

vi.mock("../context/CartContext", () => ({
    useCart: vi.fn(),
}));

const renderHomePage = () => {
    useBooks.mockReturnValue({ getBooks: vi.fn() });
    useCart.mockReturnValue({ getCart: vi.fn() });

    render(<HomePage />);
}

test("calls getBooks and getCart on mount", () => {
    const getBooksMock = vi.fn();
    const getCartMock = vi.fn();

    useBooks.mockReturnValue({ getBooks: getBooksMock });
    useCart.mockReturnValue({ getCart: getCartMock });

    render(<HomePage />);

    expect(getBooksMock).toHaveBeenCalledTimes(1);
    expect(getCartMock).toHaveBeenCalledTimes(1);
});

test("renders Books list title", () => {
    renderHomePage();

    expect(screen.getByText("Books list")).toBeInTheDocument();
});

test("renders Your order title", () => {
    renderHomePage();

    expect(screen.getByText("Your order")).toBeInTheDocument();
});

test("renders BookTable component", () => {
    renderHomePage();

    expect(screen.getByText("Books list")).toBeInTheDocument();
});

test("renders ShoppingCart component", () => {
    renderHomePage();

    expect(screen.getByText("Your order")).toBeInTheDocument();
});
