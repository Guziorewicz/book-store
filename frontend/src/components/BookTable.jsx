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
    <div className="overflow-x-auto bg-white shadow-md rounded-lg min-w-[600px]">    
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-green-600 text-white">
                    <th scope="col" className="px-4 py-3 text-left font-semibold">Title</th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold">Author</th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold">Pages</th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold">Stock</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">Price</th>
                    <th scope="col" className="px-4 py-3 text-center font-semibold">Action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id} className="border-t hover:bg-green-100 transition duration-150">
                    <td className="px-4 py-3">{book.title}</td>
                    <td className="px-4 py-3">{book.author}</td>
                    <td className="px-4 py-3 text-center">{book.pages}</td>
                    <td
                      className={`px-4 py-3 text-center ${
                        book.stock > 0
                          ? "text-green-600 font-medium"
                          : "text-red-500 font-bold underline opacity-80 cursor-not-allowed"
                      }`}
                    >
                        {book.stock}</td>
                    <td className="px-4 py-3 text-right">{book.price.toFixed(2)} €</td>
                    <td className="px-4 py-3 text-center">
                        <button 
                            className="text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                            disabled={book.stock === 0}
                            aria-disabled={book.stock === 0}
                            onClick={() => handleAddToCartClick(book)}
                            aria-label={`Add ${book.title} to Cart`}
                            role="button"
                        >🛒</button></td>
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