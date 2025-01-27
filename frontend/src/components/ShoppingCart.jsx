import React, { useState } from 'react';
import DeleteFromCart from './ItemDeletion';
import { removeFromCart } from '../api/orders'

const ShoppingCart = ({cart, setCart, setBooks, books}) => {

    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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


    return (
    <div>    
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Stock</th>
                    <th>Unit Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.cart.map((item) => (
                    <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.stock}</td>
                    <td>{item.price.toFixed(2)} EUR</td>
                    <td><button onClick={() => handleRemoveItemClick(item)}>X</button></td>
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
    </div>
    );
};

export default ShoppingCart;