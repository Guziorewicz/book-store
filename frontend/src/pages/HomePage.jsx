import { useEffect } from 'react';
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";
import BookTable from '../components/BookTable';
import ShoppingCart from '../components/ShoppingCart';

const HomePage = () => {

    const { getBooks } = useBooks();
    const { getCart } = useCart();
   

    // Init
    useEffect(() => {
        getBooks();
        getCart();
    }, []);


    return(
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-4xl font-extrabold text-primary mb-6 font-serif">Books list</h2>
                    <BookTable />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold text-primary mb-6 font-sans italic">Your order</h2>
                    <ShoppingCart />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
