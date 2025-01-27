import axios from 'axios';

const BOOKS_API_URL = '/books-api';

export const fetchBooks = async () => {
    try {
        const response = await axios.get(BOOKS_API_URL + '/books/');
        return response.data;
    } catch (error) {
        console.error('Error fetching books', error);
        throw error;
    }
}