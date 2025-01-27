import React, { useState } from 'react';
import DeleteFromCart from './ItemDeletion';
import { removeFromCart } from '../api/orders'

const ShoppingCart = ({cart, setCart, setBooks, books}) => {

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
    
    const handleRemoveOrder = async () => {
        try {
            const itemToRemove = selectedToDelete;
            const response = await removeFromCart({ itemToRemove });
            setCart(response);
            console.log(`Removed ${selectedToDelete.title}`);
            // Remove from page stock 
            const updatedBooks = books.map((book) => {
                if (book.id === selectedToDelete.id) {
                    return { ...book, stock: book.stock + selectedToDelete.stock };
                }
                return book;
            });
            setBooks(updatedBooks);
        } catch (error) {
            console.log("Error with removing", error);
        }
    }

    const handleDelivery = () => {
        const el = delivery;
        setDelivery(!el);
    }

    return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">    
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-green-600 text-white">
                    <th className="px-4 py-2 text-left font-semibold">Title</th>
                    <th className="px-4 py-2 text-left font-semibold">Author</th>
                    <th className="px-4 py-2 text-center font-semibold">Amount</th>
                    <th className="px-4 py-2 text-right font-semibold">Unit Price</th>
                    <th className="px-4 py-2 text-center font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.cart.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-green-100 transition duration-150">
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{item.author}</td>
                    <td className="px-4 py-2">{item.stock}</td>
                    <td className="px-4 py-2 text-right">{item.price.toFixed(2)} €</td>
                    <td className="px-4 py-2 text-center">
                        <button 
                        onClick={() => handleRemoveItemClick(item)}
                        className="text-red px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                        >❌</button></td>
                </tr>
                ))}
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
            <p className="text-white text-center">
            Summary:  {cart.cart.reduce((total, element) => total + element.stock * element.price, 0).toFixed(2)} €
            </p>
            <div className="bg-green-600 text-center border-collapse">
                <button className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                    onClick={handleDelivery}
                >
                    Make order
                </button>
            </div>
        </div>
            {
                delivery && <p className="text-white text-center bg-green-600">UPCOMING</p>
            }
    </div>
    );
};

export default ShoppingCart;