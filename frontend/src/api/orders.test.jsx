import axios from "axios";
import { fetchOrder, addOrderToCart, removeFromCart } from "./orders"; 
import { test, expect, vi } from "vitest";

// Mock axios
vi.mock("axios");


test("fetchOrder makes a GET request to /cart-api/cart/1", async () => {

    axios.get.mockResolvedValue({data: {user_id: 1, cart: [{id: 1, title: "Book A", stock: 4}]}});

    const cart = await fetchOrder();

    expect(axios.get).toHaveBeenCalledWith("/cart-api/cart/1");
    
    expect(cart).toEqual({user_id: 1, cart: [{id: 1, title: "Book A", stock: 4}]});
});

test("fetchOrder throws an error when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await expect(fetchOrder()).rejects.toThrow("Network Error");

    expect(axios.get).toHaveBeenCalledWith("/cart-api/cart/1");
});

// Mock POST data
const postMockData = {
    id: 1,
    title: 'Book A',
    author: 'Author',
    stock: 2,
    price: 22.2
};


test("addOrderToCart makes POST request with correct order in body", async () => {
    axios.post.mockResolvedValue({ data: { success: true, item: postMockData } });

    const response = await addOrderToCart({ order: postMockData });

    expect(axios.post).toHaveBeenCalledWith("/cart-api/cart/1/add", postMockData, {
        headers: { "Content-Type": "application/json" }
    });

    expect(response).toEqual({ success: true, item: postMockData });
});

test("addOrderToCart throws an error when API call fails", async () => {
    axios.post.mockRejectedValue(new Error("Internal Server Error"));

    await expect(addOrderToCart({ order: postMockData })).rejects.toThrow("Internal Server Error");

    expect(axios.post).toHaveBeenCalledWith("/cart-api/cart/1/add", postMockData, {
        headers: { "Content-Type": "application/json" }
    });
});


test("removeFromCart makes POST request with correct order in body", async () => {
    axios.post.mockResolvedValue({ data: { itemToRemove: postMockData } });

    const response = await removeFromCart({ itemToRemove: postMockData });

    expect(axios.post).toHaveBeenCalledWith("/cart-api/cart/1/remove", postMockData, {
        headers: { "Content-Type": "application/json" }
    });

    expect(response).toEqual({ itemToRemove: postMockData });
});

test("removeFromCart throws an error when API call fails", async () => {
    axios.post.mockRejectedValue(new Error("Internal Server Error"));

    await expect(removeFromCart({ itemToRemove: postMockData })).rejects.toThrow("Internal Server Error");

    expect(axios.post).toHaveBeenCalledWith("/cart-api/cart/1/remove", postMockData, {
        headers: { "Content-Type": "application/json" }
    });
});