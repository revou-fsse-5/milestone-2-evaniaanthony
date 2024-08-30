import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';
import { Product } from '../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { handleAddToCart } from '../utils/cartUtils';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(Number(id));
        setProduct(response.data);
      } catch (error) {
        setError('Failed to fetch product details.');
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (product) {
      handleAddToCart(product, cart, setCart, (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">{product.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="w-full h-80"
              spaceBetween={10}
              slidesPerView={1}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product.title} - ${index}`}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Price: ${product.price}</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button
              onClick={addToCart}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {notification && (
          <div className="fixed top-14 right-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg">
            {notification}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
