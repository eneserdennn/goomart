import { useDispatch, useSelector } from "react-redux";

import CategoryCard from "../ui/CategoryCard";
import Link from "next/link";
import Loading from "@/app/loading";
import React from "react";
import { setCategories } from "@/redux/features/filter/filterSlice";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApiSlice";

interface SubCategory {
  id: number;
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  SubCategory: SubCategory[];
}

const ConvertCategoryName = (name: string) => {
  name = name.toLocaleLowerCase().replace(/ /g, "-");
  name = name.replace(/ı/g, "i");
  name = name.replace(/ö/g, "o");
  name = name.replace(/ü/g, "u");
  name = name.replace(/ş/g, "s");
  name = name.replace(/ç/g, "c");
  name = name.replace(/ğ/g, "g");
  return name;
};

const Categories: React.FC = () => {
  // @ts-ignore
  const {
    data: categoriesData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery({});
  const dispatch = useDispatch();
  dispatch(setCategories(categoriesData));
  const categories = useSelector((state: any) => state.filter.categories);
  let content;

  if (!categoriesData && isLoading) {
    return <Loading />;
  } else if (categories) {
    content = (
      <div className="flex flex-wrap mb-16">
        {categories.map((category: Category) => (
          <div
            className="w-1/3 md:w-1/3 lg:w-1/7 flex justify-around"
            key={category.id}
            onClick={() => {}}
          >
            <Link
              href={{
                pathname: `/categories/${category.id}/${ConvertCategoryName(
                  category.name
                )}`,
              }}
              key={category.id}
            >
              <CategoryCard title={category?.name} imageUrl={category?.image} />
            </Link>
          </div>
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex flex-wrap justify-around p-4 mb-16">
        {
          // @ts-ignore
          error.status === "FETCH_ERROR" && (
            <div>
              <h1 className="text-center text-2xl font-semibold mb-4">
                Bir hata oluştu
              </h1>
              <p className="text-center text-lg font-semibold mb-4">
                Lütfen daha sonra tekrar deneyiniz
              </p>
            </div>
          )
        }
      </div>
    );
  }

  return content;
};

export default Categories;
