"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  selectFilteredProductTypes,
  selectIsFiltered,
  selectIsSearched,
  selectProducts,
  selectSelectedBrands,
  selectSelectedProductType,
  selectSelectedSubCategory,
  selectSortBy,
  setFilteredProductCount,
  setProducts,
} from "@/redux/features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardDiscount from "@/components/product-cards/ProductCardDiscount";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";
import { useAllProductsByCategoryIdQuery } from "@/redux/features/categories/categoriesApiSlice";

const ProductContainer = () => {
  const dispatch = useDispatch();
  const categoryId = window.location.pathname.split("/")[2];

  const products = useSelector(selectProducts);
  const selectedSubCategory = useSelector(selectSelectedSubCategory);
  const selectedProductType = useSelector(selectSelectedProductType);
  const sortBy = useSelector(selectSortBy);
  const selectedBrands = useSelector(selectSelectedBrands);
  const filteredProductTypes = useSelector(selectFilteredProductTypes);
  const isSearched = useSelector(selectIsSearched);

  const [params, setParams] = useState({});
  const { data } = useAllProductsByCategoryIdQuery({ id: categoryId, params });

  useEffect(() => {
    if (isSearched) {
      const newParams = {
        "sort-by": sortBy,
        "filter-brand": selectedBrands,
        "filter-product-type": filteredProductTypes.map(
          (productType) => productType.id
        ),
      };
      setParams(newParams);
    } else {
      const newParams = {};
      setParams(newParams);
    }
  }, [sortBy, selectedBrands, filteredProductTypes, isSearched]);

  useEffect(() => {
    if (data) {
      dispatch(setFilteredProductCount(data.productCount));
      dispatch(setProducts(data));
    }
  }, [data, selectedSubCategory, params]);

  const filteredProducts = products.SubCategory?.filter(
    (product) => product.id === selectedSubCategory.id
  );

  const isFirstRender = useRef(true);
  const productTypeRef = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (productTypeRef.current) {
      const stickyHeaderHeight = 74;
      const elementPosition = productTypeRef.current.offsetTop;
      const offsetPosition = elementPosition - stickyHeaderHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [selectedProductType]);

  return (
    <div className="flex flex-col w-full justify-center">
      {filteredProducts?.map((productTypes) => (
        <div>
          {productTypes.ProductType.map((productType) => (
            <div
              key={productType.id}
              ref={
                productType.name === selectedProductType?.name
                  ? productTypeRef
                  : null
              }
            >
              {productType.Product.length > 0 && (
                <div className="p-2 mt-12 my-1 font-bold text-[15px]">
                  {productType.name}
                </div>
              )}
              <div className="flex flex-wrap justify-around bg-white shadow-md">
                {productType.Product.map((product) => {
                  const key = product.id;
                  if (
                    product.mainProductUnitStock > 0 &&
                    product.saleAmount > 0
                  ) {
                    return <ProductCardDiscount key={key} product={product} />;
                  }
                  if (product.mainProductUnitStock > 0) {
                    return <ProductCard key={key} product={product} />;
                  }
                  return <ProductCardOutOfStock key={key} product={product} />;
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductContainer;
