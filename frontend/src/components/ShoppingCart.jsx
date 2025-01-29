import React, { useState, useMemo, useCallback } from 'react';
import DeleteFromCart from './ItemDeletion';
import { useCart } from "../context/CartContext";
import { useBooks} from "../context/BooksContext";

const ShoppingCart = () => {

    const { cart, removeFromCartHandler  } = useCart();
    const { setBooks } = useBooks();

    const totalPrice = useMemo(() => {
        return cart.cart.reduce((total, element) => total + element.stock * element.price, 0).toFixed(2);
    }, [cart.cart]); 

    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [delivery, setDelivery] = useState(false);

    const handleRemoveItemClick = (item) => {
        setSelectedToDelete(item);
        setIsModalOpen(true);
    } 

    const handleCloseModal = () => {
        setSelectedToDelete(null);
        setIsModalOpen(false);
    }
    

    const handleRemoveOrder = useCallback(async () => {
        try {
            await removeFromCartHandler(selectedToDelete);
            console.log(`Removed ${selectedToDelete.title}`);
        } catch (error) {
            console.log("Error with removing", error);
        }
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === selectedToDelete.id ? { ...book, stock: book.stock + selectedToDelete.stock } : book
            )
        );
    }, [selectedToDelete, removeFromCartHandler, setBooks]);
    
    const handleDelivery = useCallback(() => {
        setDelivery((prev) => !prev);
    }, []);

    const cartItems = useMemo(() => {
        return cart.cart.map((item) => (
            <tr key={item.id} className="border-t hover:bg-green-100 transition duration-150">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.author}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2 text-right">{item.price.toFixed(2)} €</td>
                <td className="px-4 py-2 text-center">
                    <button 
                        onClick={() => handleRemoveItemClick(item)}
                        className="text-red px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                        aria-label={`Remove ${item.title} from cart`}
                    >❌</button>
                </td>
            </tr>
        ));
    }, [cart.cart]);

    return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">    
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-green-600 text-white">
                    <th scope="col" className="px-4 py-2 text-left font-semibold">Title</th>
                    <th scope="col" className="px-4 py-2 text-left font-semibold">Author</th>
                    <th scope="col" className="px-4 py-2 text-center font-semibold">Amount</th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">Unit Price</th>
                    <th scope="col" className="px-4 py-2 text-center font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {cartItems}
            </tbody>
        </table>
        {selectedToDelete && (
            <DeleteFromCart
                id={selectedToDelete?.id}
                title={selectedToDelete?.title}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleRemoveOrder}
            />
        )}
        <div className="bg-green-600 text-white border-collapse p-2 flex justify-between items-center">
            <p className="text-white text-center font-bold">
            {totalPrice} €
            </p>
            <div className="bg-green-600 text-center border-collapse">
                <button 
                    className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                    onClick={handleDelivery}
                    aria-label="Confirm order and proceed to delivery"
                    role="button"
                >
                    Make order
                </button>
            </div>
        </div>
            {
                delivery && 
                (<p className="text-green-800 font-bold text-center bg-white p-2 rounded-md shadow-md">UPCOMING</p>)
            }
    </div>
    );
};

export default ShoppingCart;