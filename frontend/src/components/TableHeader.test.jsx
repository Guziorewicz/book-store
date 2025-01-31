import { render, screen } from "@testing-library/react";
import TableHeader from "./TableHeader";
import { test, expect } from "vitest";

const mockColumns = ["Title", "Author", "Pages", "Stock", "Price", "Action"];

test("renders table header correctly", () => {
    render(<TableHeader columns={mockColumns} />);
    
    expect(screen.getByRole("row")).toBeInTheDocument();
});

test("renders correct number of columns", () => {
    render(<TableHeader columns={mockColumns} />);

    const headers = screen.getAllByRole("columnheader"); // Znajduje wszystkie <th>
    
    expect(headers.length).toBe(mockColumns.length);
});

test("renders correct column titles", () => {
    render(<TableHeader columns={mockColumns} />);

    mockColumns.forEach(column => {
        expect(screen.getByText(column)).toBeInTheDocument();
    });
});
