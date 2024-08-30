import React, { useState, useEffect } from 'react';
import { Product } from '../types/types';

const ShoppingCartPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Load cart from localStorage or initialize empty cart
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    // Clear cart and localStorage
    setCart([]);
    localStorage.removeItem('cart');
    setIsModalOpen(false);
  };

  const cancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-7">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="border border-gray-300 p-4 rounded-md flex items-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, Math.max(product.quantity - 1, 1))}
                      className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.quantity || 1}
                      readOnly
                      className="mx-2 w-12 text-center border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleQuantityChange(product.id, (product.quantity || 1) + 1)}
                      className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmCheckout}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={cancelCheckout}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
