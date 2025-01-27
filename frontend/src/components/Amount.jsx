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
            content: { width: '300px',height: '400px', margin: 'auto', textAlign: 'center' }
        }}
    >    
        <div>
            <button onClick={onClose}>X</button>
            <p>Chosed: {title} - {selectedAmount}</p>
            <div>
            <button onClick={handleDecrease}>-</button>
            <button onClick={handleIncrease}>+</button>
            </div>
            <button onClick={handleConfirm}>V</button>
        </div>
    </Modal>
    );

};

export default AddToCart;