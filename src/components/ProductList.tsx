import React from 'react';
import { Product } from '../types/types';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onProductClick: (productId: number) => void;
    onLoadMore: () => void;
    hasMore: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onProductClick, onLoadMore, hasMore }) => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={`${product.id}-${index}`}
                        product={product}
                        onAddToCart={onAddToCart}
                        onClick={onProductClick}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onLoadMore}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
