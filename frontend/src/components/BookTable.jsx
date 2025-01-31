import { useState, useMemo, useCallback } from 'react';
import AddToCart from './Amount'
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";
import TableHeader from "./TableHeader";

const BookTable = () => {

    const columns = ["Title", "Author", "Pages", "Stock", "Price", "Action"];

    const { books, setBooks  } = useBooks();
    const { setCart, addToCart } = useCart();

    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const sortedBooks = useMemo(() => {
        return (books || []).slice().sort((a, b) => a.title.localeCompare(b.title));
    }, [books]);

    const handleAddToCartClick = useCallback((book) => () => {
        setSelectedBook(book);
        setIsModalOpen(true);
    }, []);


    const handleCloseModal = useCallback(() => {
        setSelectedBook(null);
        setIsModalOpen(false);
    }, []);


    const handleConfirmAdd = useCallback(async (id, amount) => {
        if (selectedBook.id === id) {
            try {
                const order = {
                    id: selectedBook.id,
                    title: selectedBook.title,
                    author: selectedBook.author,
                    stock: amount,
                    price: selectedBook.price
                };
                await addToCart(order);
            } catch (error) {
                console.log("Error with adding to cart", error);
            }
            
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === id ? { ...book, stock: book.stock - amount } : book
                )
            );
        }
        handleCloseModal();
    }, [selectedBook, addToCart, setCart, setBooks]);

    return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg min-w-[600px]">    
        <table className="table-auto w-full border-collapse">
            <TableHeader columns={columns} />
            <tbody>
                {sortedBooks.map((book) => (
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
                    <td className="px-4 py-3 text-right">{book.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                        <button 
                            className="text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                            disabled={book.stock === 0}
                            aria-disabled={book.stock === 0}
                            onClick={handleAddToCartClick(book)}
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