import { createContext, useState, useContext } from "react";
import { fetchBooks } from "../api/books";
import Book from '../models/Book'

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(Book.fromJSON(data));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <BooksContext.Provider value={{ books, getBooks, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
