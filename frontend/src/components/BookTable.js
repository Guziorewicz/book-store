import React, { useState } from 'react';
import AddToCart from './Amount'
import { checkAmount } from '../api/books';
import { addOrderToCart } from '../api/orders';

const BookTable = ({books, onReload}) => {


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
        
        // Take book position with amount 
        if(selectedBook.id === id) {
            // Check if amount of books is avaliable books-api
            try {
                checkAmount(id, amount);
                // Remember to get books from stock

                        // If 200 then add books data to cart via orders-api
                    try {
                        // Prepare to send
                        const order = {
                            id: selectedBook.id,
                            title: selectedBook.title,
                            author: selectedBook.author,
                            pages: selectedBook.pages,
                            stock: amount,
                            price: selectedBook.price
                        }
                        console.log(JSON.stringify(order));
                        addOrderToCart({order});
                        // onReload({books: true, cart: true});
                    } catch (error) {
                        console.log("Error with adding to cart", error);
                    } 
                    // Confirm order and get reservation from stock
                
            } catch (error) {
                console.log("Not on stock", error);
            } 
            
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