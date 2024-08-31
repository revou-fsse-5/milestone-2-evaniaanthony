import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api/api';
import { Product, Category } from '../types/types';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import { handleAddToCart } from '../utils/cartUtils';

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts(offset, limit, selectedCategory);
        if (response.data.length < limit) {
          setHasMore(false);
        }
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    loadProducts();
  }, [offset, limit, selectedCategory]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
    setOffset(0);
    setProducts([]);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const addToCart = (product: Product) => {
    handleAddToCart(product, cart, setCart, (message) => setNotification(message));
  };

  return (
    <div className="max-w-6xl mx-auto py-7">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />

      <ProductList
        products={products}
        onAddToCart={addToCart}
        onProductClick={handleProductClick}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />

      {notification && (
        <div className="fixed top-14 right-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;