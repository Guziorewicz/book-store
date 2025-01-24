import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/books';
import BookTable from '../components/BookTable';
import { fetchOrder } from '../api/orders';
import ShoppingCart from '../components/ShoppingCart';

const HomePage = () => {
    // Books from store
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Order from cart
    const [cart, setCart] = useState([{}]);
    const [loadingCart, setLoadingCart] = useState(true);

    // Init books 
    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks();
                //console.log(data)
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        getBooks();

        // Init cart 
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

        
        getCart();
    }, []);

    if (loading) {
        return <p>Ładowanie danych...</p>
    }


    if (loadingCart) {
        return <p>Ładowanie zamówienia...</p>
    }

    return(
        <div>
            <div>
                <h1>Lista książek</h1>
                <BookTable books={books} />
            </div>
            <div>
                <h2>Twoje zamówienie</h2>
                <ShoppingCart cart={cart} />
            </div>
        </div>
    );
};

export default HomePage;
