export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
    category?: Category; 
    quantity: number;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}


