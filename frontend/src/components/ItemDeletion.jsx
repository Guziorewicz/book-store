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
            <div className="text-center relative bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg"  onClick={onClose}>X</button>
                <p className="text-lg font-semibold mb-4">Removing: {title} </p>
                <button className="bg-red-600 text-white text-center px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition" onClick={handleConfirm}>Remove from cart</button>
            </div>
        </Modal>
        );
};

export default DeleteFromCart;