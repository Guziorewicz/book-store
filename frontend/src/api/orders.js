import axios from 'axios';

const API_URL = 'http://localhost:8000/';


export const fetchOrder = async () => {
    try {
        const user_id = 1;
        const response = await axios.get(API_URL + 'cart/' + user_id);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart', error);
        throw error;
    }
}