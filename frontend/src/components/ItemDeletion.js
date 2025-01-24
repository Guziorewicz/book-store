import React from 'react';
import Modal from 'react-modal';

const DeleteFromCart = ({id, title, isOpen, onClose, onConfirm}) => {


    const handleConfirm = () => {
        onConfirm(id);
        onClose(); 
    };

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Usuń z koszyka"
            style={{
                content: { width: '300px',height: '400px', margin: 'auto', textAlign: 'center' }
            }}
        >    
            <div>
                <button onClick={onClose}>X</button>
                <p>Remove from cart: {title} </p>
                <button onClick={handleConfirm}>V</button>
            </div>
        </Modal>
        );
};

export default DeleteFromCart;