import axios from "axios";
import { fetchBooks } from "./books"; 
import { test, expect, vi } from "vitest";

// Mock axios
vi.mock("axios");

test("fetchBooks makes a GET request to /books/", async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, title: "Book A" }] });

    const books = await fetchBooks();

    expect(axios.get).toHaveBeenCalledWith("/books-api/books/");
    expect(books).toEqual([{ id: 1, title: "Book A" }]);
});

test("fetchBooks throws an error when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchBooks()).rejects.toThrow("Network Error");

    expect(axios.get).toHaveBeenCalledWith("/books-api/books/");
});
