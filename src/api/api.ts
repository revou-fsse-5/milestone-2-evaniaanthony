import axios from 'axios';
import { Product, Category } from '../types/types';


const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Check if email is available
export const checkEmailAvailability = async (email: string) => {
    return axios.post(`${API_BASE_URL}/users/is-available`, { email });
};

// Register a new user
export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}) => {
    return axios.post(`${API_BASE_URL}/users`, userData);
};

// Fetch users (for login validation, for example)
export const fetchUsers = async () => {
    return axios.get(`${API_BASE_URL}/users`);
};

// Fetch products with pagination and optional category filtering
export const fetchProducts = async (offset: number, limit: number, categoryId?: number) => {
    const url = new URL(`${API_BASE_URL}/products`);
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('limit', limit.toString());

    if (categoryId) {
        url.searchParams.append('categoryId', categoryId.toString());
    }

    return axios.get(url.toString());
};

// Fetch categories
export const fetchCategories = async () => {
    return axios.get(`${API_BASE_URL}/categories`);
};


export const fetchProductById = (id: number) => axios.get<Product>(`${API_BASE_URL}/products/${id}`);