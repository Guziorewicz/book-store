import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/books';
import BookTable from '../components/BookTable';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        getBooks();
    }, []);

    if (loading) {
        return <p>Ładowanie danych...</p>
    }

    return(
        <div>
            <h1>Lista książek</h1>
            <BookTable books={books} />
        </div>
    );
};

export default HomePage;
