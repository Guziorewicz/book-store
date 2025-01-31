import { useState, useCallback } from 'react';
import Modal from 'react-modal';


const AddToCart = ({ id, title, stock, isOpen, onClose, onConfirm }) => {


    const [selectedAmount, setSelectedAmount] = useState(1);


    const handleIncrease = useCallback(() => {
        setSelectedAmount(prev => Math.min(prev + 1, stock));
    }, [stock]);
    
    const handleDecrease = useCallback(() => {
        setSelectedAmount(prev => Math.max(prev - 1, 1));
    }, []);
    
    const handleConfirm = useCallback(() => {
        onConfirm(id, selectedAmount);
        onClose();
    }, [id, selectedAmount, onConfirm, onClose]);

    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add to cart"
        style={{
            overlay: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            },
            content: {
              position: 'relative',
              inset: 'unset',
              padding: 0, 
              border: 'none', 
              backgroundColor: 'transparent', 
            },
          }}
    >    
    <div 
          data-testid="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={onClose}
          >
        <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-center">
                <button  
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg" 
                    onClick={onClose}
                    aria-label="Close Add to Cart Modal"
                >X</button>
                <h2 className="text-lg font-semibold mb-4">Chosed: {title}</h2>
                <div className="text-lg font-semibold mb-4" id="stock-value" aria-live="polite"> {selectedAmount} item/s selected </div>
                <div className="flex justify-center items-center gap-4 mb-6">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <button 
                            className="w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition" 
                            onClick={handleDecrease}
                            aria-label="Decrease quantity"
                        >-</button>
                        <button 
                            className="w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition" 
                            onClick={handleIncrease}
                            aria-label="Increase quantity"
                        >+</button>
                    </div>
                </div>
                <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition" 
                    onClick={handleConfirm}
                    role="button"
                    aria-label="Add to cart"
                >✔ Add to cart</button>
            </div>
        </div>
    </div>
    </Modal>
    );

};

export default AddToCart;