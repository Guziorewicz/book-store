import axios from 'axios';

const API_URL = 'http://localhost:8009/';
const user_id = 1; // for latest user base


export const fetchOrder = async () => {
    try {
        const response = await axios.get(API_URL + 'cart/' + user_id);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart', error);
        throw error;
    }
}

export const addOrderToCart = async ({order}) => {
    try {
        const response = await axios.post(API_URL + 'cart/' + user_id + '/add', order, {
            headers:{
                'Content-Type': 'application/json',
            },
        });
        console.log("Response from server: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart', error);
        throw error;
    }
}

export const removeFromCart = async ({itemToRemove}) => {
    try {
        const response = await axios.post(API_URL + 'cart/' + user_id + '/remove', itemToRemove, {
            headers:{
                'Content-Type': 'application/json',
            },
        });
        console.log("Response from server: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error removing', error);
        throw error;
    }

}