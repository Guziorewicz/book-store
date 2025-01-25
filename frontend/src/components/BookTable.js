import React, { useState } from 'react';
import AddToCart from './Amount'
import { addOrderToCart } from '../api/orders';

const BookTable = ({books, setCart, setBooks}) => {


    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCartClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedBook(null);
        setIsModalOpen(false);
    }

    const handleConfirmAdd = async (id, amount) => {
        
        // Take book position with amount 
        if(selectedBook.id === id) {
            try {
                // Prepare to send
                const order = {
                    id: selectedBook.id,
                    title: selectedBook.title,
                    author: selectedBook.author,
                    stock: amount,
                    price: selectedBook.price
                }
                const response = await addOrderToCart({order});
                setCart(response);
            } catch (error) {
                console.log("Error with adding to cart", error);
            } 
            // Remove from page stock 
            const updatedBooks = books.map((book) => {
                if (book.id === id) {
                    return { ...book, stock: book.stock - amount };
                }
                return book;
            });
            setBooks(updatedBooks);
        } else {
            console.error("Something goes wrong, try again");
            return;
        }


        handleCloseModal();
    }


    return (
    <div>    
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.pages}</td>
                    <td>{book.stock}</td>
                    <td>{book.price.toFixed(2)} EUR</td>
                    <td><button onClick={() => handleAddToCartClick(book)}>🛒</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        {selectedBook && (
            <AddToCart
                id={selectedBook?.id}
                title={selectedBook?.title}
                stock={selectedBook?.stock}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAdd}
            />
        )}
    </div>
    );
};

export default BookTable;