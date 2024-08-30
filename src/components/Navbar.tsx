import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/types';
import { useAuth } from '../auth/AuthContext';

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const { isAuthenticated, userName, logout } = useAuth();

  useEffect(() => {
    // Load cart from localStorage and update cart count
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems: Product[] = JSON.parse(storedCart);
      setCartCount(cartItems.length);
    }
  }, []);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/products" className="text-xl font-bold">
          Fake Store
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <Link to="/cart" className="flex items-center space-x-2">
                <span>Cart</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <span>Welcome, {userName}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
