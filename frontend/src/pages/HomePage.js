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
    const [cart, setCart] = useState([{}]);
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


    // Reloading tables
    const onReload = async ({books = false, cart = false} = {}) => {
        console.log("reloadm");
        console.log("b");
        console.log(books);
        console.log("c");
        console.log(cart);
        if (books) {
            await getBooks();
        }
        if (cart) {
            await getCart();
        }
    }


    if (loadingBooks) {
        return <p>Ładowanie danych...</p>
    }


    if (loadingCart) {
        return <p>Ładowanie zamówienia...</p>
    }

    return(
        <div>
            <div>
                <h1>Lista książek</h1>
                <BookTable books={books} onReload={onReload} />
            </div>
            <div>
                <h2>Twoje zamówienie</h2>
                <ShoppingCart cart={cart} onReload={onReload} />
            </div>
        </div>
    );
};

export default HomePage;
