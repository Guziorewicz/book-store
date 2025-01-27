import React, { useState } from 'react';
import Modal from 'react-modal';

const AddToCart = ({ id, title, stock, isOpen, onClose, onConfirm }) => {


    const [selectedAmount, setSelectedAmount] = useState(1);

    const handleIncrease = () => {
        setSelectedAmount(prev => Math.min(prev + 1, stock));
    };

    const handleDecrease = () => {
        setSelectedAmount(prev => Math.max(prev - 1, 1));
    };

    const handleConfirm = () => {
        onConfirm(id, selectedAmount);
        onClose(); 
    };


    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Dodaj do koszyka"
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
        <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="text-center">
                <button  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg" onClick={onClose}>X</button>
                <p className="text-lg font-semibold mb-4">Chosed: {title} - {selectedAmount}</p>
                <div className="flex justify-center items-center gap-4 mb-6">
                    <button className="w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition" onClick={handleDecrease}>-</button>
                    <button className="w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition" onClick={handleIncrease}>+</button>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition" onClick={handleConfirm}>✔ Add to cart</button>
            </div>
        </div>
    </Modal>
    );

};

export default AddToCart;