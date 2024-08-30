import { Product } from '../types/types';

export const handleAddToCart = (
  product: Product,
  cart: Product[],
  setCart: React.Dispatch<React.SetStateAction<Product[]>>,
  notificationCallback?: (message: string) => void
) => {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  let updatedCart: Product[];
  
  if (existingProductIndex > -1) {
    updatedCart = cart.map((item, index) =>
      index === existingProductIndex
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
  } else {
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }

  setCart(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  if (notificationCallback) {
    notificationCallback('Product added to cart!');
  }
};
