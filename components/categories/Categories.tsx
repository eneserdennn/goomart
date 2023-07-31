import React from 'react';
import Image from 'next/image';
import CategoryCard from '../ui/CategoryCard';
import {useGetCategoriesQuery} from "@/app/redux/services/categoriesApi";

const Categories = () => {
    const {data: categories, error: categoriesError, isLoading: categoriesLoading} = useGetCategoriesQuery();

    if (categoriesLoading) {
        // Show loading skeleton while categories are being fetched
        return (
            <div className="flex flex-wrap justify-around p-4">
                {[...Array(9)].map((_, index) => (
                    <div className="w-1/3 p-1" key={index}>
                        <div
                            className="flex flex-col items-center justify-center shadow-sm p-1 rounded-lg overflow-hidden bg-white h-32 max-w-xs animate-pulse">
                            <div
                                className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 mb-4"></div>
                            <span className="h-4 w-3/4 bg-gray-200 rounded"></span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (categoriesError) {
        // Optional: Handle error state and display an error message.
        return <p>Error loading categories.</p>;
    }

    // Show only the first 9 categories
    const limitedCategories = categories.slice(0, 90);

    return (
        <div className="flex flex-wrap justify-around p-4 mb-16">
            {limitedCategories.map((category) => (
                <div className="w-1/3 p-1" key={category.id}>
                    <CategoryCard title={category.name} imageUrl={category.image}/>
                </div>
            ))}
        </div>
    );
}

export default Categories;
