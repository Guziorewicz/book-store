import { createContext, useState, useContext } from "react";
import { fetchOrder, addOrderToCart, removeFromCart } from "../api/orders";
import Cart from "../models/Cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(new Cart(1, []));

  const getCart = async () => {
    try {
      const data = await fetchOrder();
      setCart(Cart.fromJSON(data)); 
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async order => {
    try {
      const response = await addOrderToCart({ order });
      setCart(Cart.fromJSON(response));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCartHandler = async (itemToRemove) => {
    try {
      const response = await removeFromCart({ itemToRemove });
      setCart(Cart.fromJSON(response));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };


  return (
    <CartContext.Provider value={{ cart, getCart, addToCart, removeFromCartHandler, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
