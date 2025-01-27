import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="bg-green-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <img src="logo.png" alt="Book Store Logo" className="h-8 w-auto" />
                <h3 className="text-white italic text-xl font-bold">Book store</h3>
                <ul className="flex space-x-6">
                    <li className="hover:text-green-300 transition duration-200"><Link to="/">Hompege</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;