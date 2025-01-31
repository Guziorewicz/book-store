import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { fetchOrder, addOrderToCart, removeFromCart } from "../api/orders";
import { test, expect, vi } from "vitest";
import Cart from "../models/Cart";

// Mock Api
vi.mock("../api/orders", () => ({
    fetchOrder: vi.fn(),
    addOrderToCart: vi.fn(),
    removeFromCart: vi.fn(),
}));

// Mock component
const TestComponent = () => {
    const { cart, getCart, addToCart, removeFromCartHandler, setCart } = useCart();

    return (
        <div>
            <p data-testid="cart-length">{cart.cart.length}</p>
            <p data-testid="functions-exist">
                {getCart && addToCart && removeFromCartHandler && setCart ? "true" : "false"}
            </p>
            <button onClick={() => getCart()}>Get Cart</button>
            <button onClick={() => addToCart({ id: 1, title: "Book A" })}>Add to Cart</button>
            <button onClick={() => removeFromCartHandler({ id: 1 })}>Remove from Cart</button>
        </div>
    );
};

// Helper - render component
const renderComponent = () => {
    render(
        <CartProvider>
            <TestComponent />
        </CartProvider>
    );
}

test("Provider initializes cart with an empty array", () => {
    
    renderComponent();

    const inCartLength = screen.getByTestId("cart-length");
    expect(inCartLength).toHaveTextContent("0");
});

test("CartProvider exposes cart and all functions in context", () => {
    
    renderComponent();

    expect(screen.getByTestId("cart-length")).toBeInTheDocument();
    expect(screen.getByTestId("functions-exist")).toHaveTextContent("true");

});

test("getCart fetches cart data and updates state", async () => {
    const mockCartData = { cart: [{ id: 1, title: "Book A" }] };
    fetchOrder.mockResolvedValue(mockCartData);

    renderComponent();
    const button = screen.getByText("Get Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("1");
    expect(fetchOrder).toHaveBeenCalledTimes(1);
});

test("addToCart makes a POST request and updates state", async () => {
    const mockCartAfterAdd = { cart: [{ id: 1, title: "Book A" }] };
    addOrderToCart.mockResolvedValue(mockCartAfterAdd);

    renderComponent();
    const button = screen.getByText("Add to Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("1");
    expect(addOrderToCart).toHaveBeenCalledWith({ order: { id: 1, title: "Book A" } });
});

test("removeFromCartHandler makes a POST request and updates state", async () => {
    const mockCartAfterRemove = { cart: [] };
    removeFromCart.mockResolvedValue(mockCartAfterRemove);

    renderComponent();
    const button = screen.getByText("Remove from Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("0");
    expect(removeFromCart).toHaveBeenCalledWith({ itemToRemove: { id: 1 } });
});

test("getCart handles API errors correctly", async () => {
    fetchOrder.mockRejectedValue(new Error("API Error"));

    renderComponent();
    const button = screen.getByText("Get Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("0");
    expect(fetchOrder).toHaveBeenCalledTimes(2);
});

test("addToCart handles API errors correctly", async () => {
    addOrderToCart.mockRejectedValue(new Error("API Error"));

    renderComponent();
    const button = screen.getByText("Add to Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("0");
    expect(addOrderToCart).toHaveBeenCalledTimes(2);
});

test("removeFromCartHandler handles API errors correctly", async () => {
    removeFromCart.mockRejectedValue(new Error("API Error"));

    renderComponent();
    const button = screen.getByText("Remove from Cart");

    await act(async () => {
        button.click();
    });

    const cartLength = screen.getByTestId("cart-length");
    expect(cartLength).toHaveTextContent("0");
    expect(removeFromCart).toHaveBeenCalledTimes(2);
});
