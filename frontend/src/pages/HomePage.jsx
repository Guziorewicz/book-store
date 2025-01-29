import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/books';
import BookTable from '../components/BookTable';
import { fetchOrder } from '../api/orders';
import ShoppingCart from '../components/ShoppingCart';

const HomePage = () => {
    // Books from store
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);

    // Order from cart
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);


    // Get books 
    const getBooks = async () => {
        try {
            const data = await fetchBooks();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoadingBooks(false);
        }
    };


    // Get cart 
    const getCart = async () => {
        try {
            const data = await fetchOrder();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoadingCart(false);
        }
    };

    // Init
    useEffect(() => {
        getBooks();
        getCart();
    }, []);


    if (loadingBooks) {
        return <p className="text-primary text-center mt-4" aria-live="polite">Loading data...</p>
    }


    if (loadingCart) {
        return <p className="text-primary text-center mt-4" aria-live="polite">Loading order...</p>
    }

    return(
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-extrabold text-primary mb-6 font-serif">Books list</h2>
                    <BookTable books={books} setCart={setCart} setBooks={setBooks}  />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold text-primary mb-6 font-sans italic">Your order</h2>
                    <ShoppingCart cart={cart} setCart={setCart} setBooks={setBooks} books={books}  />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
