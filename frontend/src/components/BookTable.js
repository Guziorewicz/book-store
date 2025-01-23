import React, { useState } from 'react';
import AddToCart from './Amount'

const BookTable = ({books}) => {


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

    const handleConfirmAdd = (id, amount) => {
        // Add api to backend with user_id
        console.log("Dodano do koszyka");
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