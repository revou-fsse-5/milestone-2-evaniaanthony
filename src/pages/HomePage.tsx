import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Welcome to the Fake Online Store</h1>
        <p className="text-lg mb-8 text-gray-600">
          Discover amazing products and enjoy a seamless shopping experience.
        </p>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/login" 
                className="block w-full px-6 py-3 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition duration-300 text-center"
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                className="block w-full px-6 py-3 bg-green-600 text-white rounded shadow-md hover:bg-green-700 transition duration-300 text-center"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
