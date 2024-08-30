import React from 'react';
import { Product } from '../types/types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onClick: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
    const truncateDescription = (description: string) => {
        const words = description.split(' ');
        if (words.length > 20) {
            return words.slice(0, 20).join(' ') + '...';
        }
        return description;
    };

    return (
        <div
            className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer bg-white flex flex-col justify-between"
            onClick={() => onClick(product.id)}
        >
            <div>
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-56 object-cover rounded-md mb-4"
                />
                <h2
                    className="text-xl font-semibold text-gray-800 mb-2"
                    style={{ minHeight: '48px' }} // Fixed height for title
                >
                    {product.title}
                </h2>
                <p
                    className="text-gray-600 text-sm mb-4"
                    style={{ minHeight: '48px' }} // Fixed height for description
                >
                    {truncateDescription(product.description)}{' '}
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(product.id);
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Learn More
                    </span>
                </p>
            </div>
            <div className="mt-4">
                <div className="text-lg font-bold text-gray-900 mb-2">
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents navigating to the detail page
                        onAddToCart(product);
                    }}
                    className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
