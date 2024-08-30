import React from 'react';
import { Category } from '../types/types';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onChange }) => {
    return (
        <div className="mb-6 flex items-center space-x-4">
            <label className="block text-lg font-medium">Filter by Category:</label>
            <select
                onChange={onChange}
                value={selectedCategory ?? ''}
                className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
