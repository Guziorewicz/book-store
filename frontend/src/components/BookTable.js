import React from 'react';

const BookTable = ({books}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Stock</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.pages}</td>
                    <td>{book.stock}</td>
                    <td>{book.price.toFixed(2)} EUR</td>
                </tr>
                })}
            </tbody>
        </table>
    );
};

export default BookTable;