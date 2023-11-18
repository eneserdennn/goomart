"use client";

import React, { useEffect } from "react";
import {
  selectCategories,
  selectIsSearched,
  selectSelectedCategory,
  selectSelectedSubCategory,
  selectSubCategories,
  setCategories,
  setSelectedCategory,
  setSelectedSubCategory,
  setSubCategories,
} from "@/redux/features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesByIdQuery,
  useGetCategoriesQuery,
} from "@/redux/features/categories/categoriesApiSlice";

import Link from "next/link";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";

interface ICategory {
  id: number;
  name: string;
  description: string;
  image: string;
  SubCategory: ISubCategory[];
}
interface ISubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface IProductType {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryBarCompProps {
  categoryId: number;
}

const CategoryBarComp = ({ categoryId }: CategoryBarCompProps) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoriesByIdQuery(categoryId);

  const pathname = usePathname();
  const path = pathname.split("/");

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useGetCategoriesQuery({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setSelectedCategory(data));
    }
  }, [data, dispatch]);

  const categories = useSelector(selectCategories);
  const category = useSelector(selectSelectedCategory);
  const subCategories = useSelector(selectSubCategories);
  const selectedSubCategory = useSelector(selectSelectedSubCategory);

  const isSearched = useSelector(selectIsSearched);

  useEffect(() => {
    dispatch(setSelectedSubCategory(subCategories[0]));
  }, [category, subCategories]);

  useEffect(() => {
    if (category?.SubCategory) {
      dispatch(setSubCategories(category.SubCategory));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (isSuccessCategories && categoriesData.length > 0) {
      dispatch(setCategories(categoriesData));
    }
    console.log(categories);
  }, [categoriesData, isSuccessCategories, dispatch]);

  if (isLoading || isLoadingCategories) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <h1>Something went wrong!</h1>
      </div>
    );
  }

  if (isSuccess && category) {
    const SubCategory = subCategories;
    if (!selectedSubCategory?.id) {
      dispatch(setSelectedSubCategory(SubCategory[0]));
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

    return (
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex overflow-x-auto h-[37px] items-center bg-[#25AC10] font-bold text-[14px] text-white whitespace-nowrap hide-scrollbar shadow relative">
          <div className="flex items-center">
            {categories &&
              categories.map((category: ICategory) => (
                <Link
                  href={{
                    pathname: `/categories/${category.id}/${ConvertCategoryName(
                      category.name
                    )}`,
                  }}
                  key={category.id}
                >
                  <div
                    className="flex flex-col justify-center mx-4 items-center relative"
                    onClick={() => {}}
                    key={category.id}
                  >
                    <div className="rounded-md">{category.name}</div>
                    {Number(path[2]) === category.id && (
                      <div className="h-1 w-full bg-yellow-400 rounded-full absolute bottom-[-6px] left-0" />
                    )}
                  </div>
                </Link>
              ))}
            {categories && categories.length === 0 && (
              <div
                className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                key={0}
              >
                Kategori Yok
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex overflow-x-auto h-[45px] items-center bg-white font-semibold text-[14px] text-[#444444]  whitespace-nowrap hide-scrollbar shadow-lg">
            <div className="flex items-center">
              {isSearched && SubCategory && SubCategory.length > 0 ? (
                SubCategory.map((subCategory: ISubCategory) => (
                  <div
                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${
                      selectedSubCategory?.id === subCategory.id
                        ? "bg-[#25AC10] text-white"
                        : "bg-white text-[#444444]"
                    }`}
                    onClick={() => {
                      dispatch(setSelectedSubCategory(subCategory));
                    }}
                    key={subCategory.id}
                  >
                    {subCategory.id ? subCategory.name : "Alt Kategori"}
                  </div>
                ))
              ) : SubCategory && SubCategory.length > 0 ? (
                SubCategory.map((subCategory: ISubCategory) => (
                  <div
                    className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full ${
                      selectedSubCategory?.id === subCategory.id
                        ? "bg-[#25AC10] text-white"
                        : "bg-white text-[#444444]"
                    }`}
                    onClick={() => {
                      dispatch(setSelectedSubCategory(subCategory));
                    }}
                    key={subCategory.id}
                  >
                    {subCategory.id ? subCategory.name : "Alt Kategori"}
                  </div>
                ))
              ) : (
                <div
                  className={`flex justify-around m-1 items-center border border-[#E2E2E2] px-4 py-1 rounded-full bg-[#25AC10] text-white`}
                  key={0}
                >
                  Alt Kategori Yok
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CategoryBarComp;
