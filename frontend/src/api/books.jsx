import axios from 'axios';

const API_URL = 'http://localhost:8007/';

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL + 'books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books', error);
        throw error;
    }
}