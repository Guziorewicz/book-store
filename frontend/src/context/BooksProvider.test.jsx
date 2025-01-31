import { render, screen, act } from "@testing-library/react";
import { BooksProvider, useBooks } from "./BooksContext";
import { fetchBooks } from "../api/books";
import { test, expect, vi } from "vitest";
import Book from "../models/Book";


// Mock Api
vi.mock("../api/books", () => ({
    fetchBooks: vi.fn(),
}));

// Mock component
const TestComponent = () => {
    const { books, getBooks } = useBooks();

    return (
        <div>
            <p data-testid="books-length">{books.length}</p>
            <button onClick={getBooks}>Fetch Books</button>
        </div>
    );
};

const renderComponent = () => {
    render(
        <BooksProvider>
            <TestComponent />
        </BooksProvider>
    );
}

test("BooksProvider initializes with an empty book list", () => {
    
    renderComponent();

    const booksLength = screen.getByTestId("books-length");
    expect(booksLength).toHaveTextContent("0");
});

test("getBooks fetches books and updates state", async () => {
    const mockData = [
        { id: 1, title: "Book A" },
        { id: 2, title: "Book B" },
    ];
    
    fetchBooks.mockResolvedValue(mockData);
    vi.spyOn(Book, "fromJSON").mockReturnValue(mockData); // Mock Book.fromJSON

    renderComponent();

    const button = screen.getByText("Fetch Books");

    await act(async () => {
        button.click();
    });

    const booksLength = screen.getByTestId("books-length");
    expect(booksLength).toHaveTextContent("2");

    expect(fetchBooks).toHaveBeenCalledTimes(1);
});

test("getBooks handles API errors", async () => {
    fetchBooks.mockRejectedValue(new Error("API Error"));

    renderComponent();

    const button = screen.getByText("Fetch Books");

    await act(async () => {
        button.click();
    });

    // Books list should still be empty
    const booksLength = screen.getByTestId("books-length");
    expect(booksLength).toHaveTextContent("0");

    expect(fetchBooks).toHaveBeenCalledTimes(2);
});