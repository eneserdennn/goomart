import CategoryCard from '../ui/CategoryCard';
import React from 'react';
import { useGetCategoriesQuery } from '@/redux/features/categories/categoriesApiSlice';

interface Category {
    id: number;
    name: string;
    image: string;
    SubCategory: {
        id: number;
        name: string;
        image: string;
    }[];
}

const Categories = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCategoriesQuery();


    let content;

    if (isLoading) {
        content = (
            <div className="flex flex-wrap justify-around">
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

    } else if (isSuccess) {
        content = (
            <div className="flex flex-wrap justify-center mb-16"> {/* justify-center sınıfını ekledik */}
                {categories.map((category: Category) => (
                    <div className="w-1/3 flex justify-around" key={category.id}> {/* Buraya flex justify-center ekledik */}
                        <CategoryCard title={category?.name} imageUrl={category?.image} />
                    </div>
                ))}
            </div>
        );

    } else if (isError) {
        content = (
            <div className="flex flex-wrap justify-around p-4 mb-16">
                {error.status === 'FETCH_ERROR' && <div>
                    <h1 className="text-center text-2xl font-semibold mb-4">Bir hata oluştu</h1>
                    <p className="text-center text-lg font-semibold mb-4">Lütfen daha sonra tekrar deneyiniz</p>
                </div>}
            </div>
        );
    }


    return content;
}

export default Categories;
