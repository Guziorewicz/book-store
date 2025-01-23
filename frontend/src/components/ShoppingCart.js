import React from 'react';

const ShoppingCart = ({cart}) => {

    
    const handleRemoveOrder = (item) => {
        console.log(`Usunięto ${item.name}`);
    }


    return (
    <div>    
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item) => (
                    <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.pages}</td>
                    <td>{item.stock}</td>
                    <td>{item.price.toFixed(2)} EUR</td>
                    <td><button onClick={() => handleRemoveOrder(item)}>X</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default ShoppingCart;