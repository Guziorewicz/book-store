import { render, screen, fireEvent, act } from "@testing-library/react";
import BookTable from "./BookTable";
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";
import { test, expect, vi } from "vitest";

vi.mock("../context/BooksContext", () => ({
    useBooks: vi.fn(),
}));

vi.mock("../context/CartContext", () => ({
    useCart: vi.fn(),
}));

// Mock book data
const mockBooks = [
    { id: 1, title: "Book A", author: "Author A", pages: 200, stock: 3, price: 15.99 },
    { id: 2, title: "Book B", author: "Author B", pages: 150, stock: 0, price: 10.99 }, // Out of stock
];

const renderBookTable = () => {
    useBooks.mockReturnValue({ books: mockBooks, setBooks: vi.fn() });
    useCart.mockReturnValue({ addToCart: vi.fn(), setCart: vi.fn() });

    render(<BookTable />);
};

test("renders book table with correct data", () => {
    renderBookTable();

    expect(screen.getByText("Book A")).toBeInTheDocument();
    expect(screen.getByText("Book B")).toBeInTheDocument();
});

test("displays correct book details", () => {
    renderBookTable();

    expect(screen.getByText("Author A")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("15.99")).toBeInTheDocument();
});

test("books should be sorted by title", () => {
    renderBookTable();

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Book A");
    expect(rows[2]).toHaveTextContent("Book B");
});

test("Add to Cart button is disabled when stock is 0", () => {
    renderBookTable();

    const buttons = screen.getAllByRole("button", { name: /Add/i });

    expect(buttons[0]).not.toBeDisabled(); 
    expect(buttons[1]).toBeDisabled(); 
});

test("opens AddToCart modal when clicking Add to Cart button", async () => {
    renderBookTable();

    const button = screen.getAllByRole("button", { name: /Add/i })[0];
    fireEvent.click(button);

    await act(async () => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
});

test("passes correct book data to AddToCart modal", async () => {
    renderBookTable();

    fireEvent.click(screen.getAllByRole("button", { name: /Add/i })[0]);

    await act(async () => {
        expect(screen.getByText("Chosed: Book A")).toBeInTheDocument();
    });
});

test("closes modal when clicking close button", async () => {
    renderBookTable();

    fireEvent.click(screen.getAllByRole("button", { name: /Add/i })[0]);

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    await act(async () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
});

test("updating stock when confirming add to cart", async () => {
    const setBooksMock = vi.fn();

    useBooks.mockReturnValue({ books: mockBooks, setBooks: setBooksMock });
    useCart.mockReturnValue({ addToCart: vi.fn(), setCart: vi.fn() });

    render(<BookTable />);

    fireEvent.click(screen.getAllByRole("button", { name: /Add/i })[0]);

    const confirmButton = screen.getByText("✔ Add to cart");

    await act(async () => {
        fireEvent.click(confirmButton);
    });

    expect(setBooksMock).toHaveBeenCalledTimes(1);
});


