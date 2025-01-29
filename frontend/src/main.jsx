import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from 'react-modal';
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext.jsx";
import { BooksProvider } from "./context/BooksContext.jsx";

Modal.setAppElement('#root');


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BooksProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </BooksProvider>
  </StrictMode>,
)
