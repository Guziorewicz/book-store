import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";

test("renders Navbar with correct role and label", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    const navbar = screen.getByRole("navigation", { name: "Main navigation" });
    expect(navbar).toBeInTheDocument();
});

test("Navbar displays the correct title", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    const title = screen.getByText("Book store");
    expect(title).toBeInTheDocument();
});

test("Navbar contains a logo with correct alt text", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    const logo = screen.getByAltText("Book Store Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "logo.png");
});

test("Navbar contains a Homepage link", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Hompege/i }); 
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
});