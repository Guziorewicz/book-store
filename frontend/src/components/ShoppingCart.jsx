import { useState, useMemo, useCallback } from 'react';
import DeleteFromCart from './ItemDeletion';
import { useCart } from "../context/CartContext";
import { useBooks} from "../context/BooksContext";
import TableHeader from "./TableHeader";

const ShoppingCart = () => {

    const { cart, removeFromCartHandler  } = useCart();
    const { setBooks } = useBooks();

    const columns = ["Title", "Author", "Amount", "Unit Price", "Action"];

    const totalPrice = useMemo(() => {
        return cart.cart.reduce((total, element) => total + element.stock * element.price, 0).toFixed(2);
    }, [cart.cart]); 

    const [selectedToDelete, setSelectedToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [delivery, setDelivery] = useState(false);

    const handleRemoveItemClick = useCallback((item) => () => {
        setSelectedToDelete(item);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = () => {
        setSelectedToDelete(null);
        setIsModalOpen(false);
    }
    

    const handleRemoveOrder = useCallback(async () => {
        const { id, title, stock } = selectedToDelete;
        try {
            await removeFromCartHandler(selectedToDelete);
            console.log(`Removed ${title}`);
        } catch (error) {
            console.log("Error with removing", error);
        }
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === id ? { ...book, stock: book.stock + stock } : book
            )
        );
    }, [selectedToDelete, removeFromCartHandler, setBooks]);
    
    const handleDelivery = useCallback(() => {
        setDelivery((prev) => !prev);
    }, []);

    const cartItems = useMemo(() => {
        return cart.cart.map((item) => (
            <tr key={item.id} className="border-t hover:bg-green-100 transition duration-150">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.author}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2 text-right">{item.price.toFixed(2)} €</td>
                <td className="px-4 py-2 text-center">
                    <button 
                        onClick={handleRemoveItemClick(item)}
                        className="text-red px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                        aria-label={`Remove ${item.title} from cart`}
                    >❌</button>
                </td>
            </tr>
        ));
    }, [cart.cart]);

    return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">    
        <table className="table-auto w-full border-collapse">
             <TableHeader columns={columns} />
            <tbody>
                {cartItems}
            </tbody>
        </table>
        {selectedToDelete && (
            <DeleteFromCart
                id={selectedToDelete?.id}
                title={selectedToDelete?.title}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleRemoveOrder}
            />
        )}
        <div className="bg-green-600 text-white border-collapse p-2 flex justify-between items-center">
            <p className="text-white text-center font-bold">
            {totalPrice} €
            </p>
            <div className="bg-green-600 text-center border-collapse">
                <button 
                    className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition duration-150"
                    onClick={handleDelivery}
                    aria-label="Confirm order and proceed to delivery"
                    role="button"
                >
                    Make order
                </button>
            </div>
        </div>
            {
                delivery && 
                (<p className="text-green-800 font-bold text-center bg-white p-2 rounded-md shadow-md">UPCOMING</p>)
            }
    </div>
    );
};

export default ShoppingCart;