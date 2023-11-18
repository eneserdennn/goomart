"use client";
import { selectSelectedSubCategory } from "@/redux/features/filter/filterSlice";
import { useSelector } from "react-redux";
import { useGetProductsBySubCategoryIdQuery } from "@/redux/features/products/productApiSlice";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product-cards/ProductCard";
import ProductCardOutOfStock from "@/components/product-cards/ProductOutOfStock";

interface ProductUnit {
  id: number;
  name: string;
  convertionToMainUnit: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  archived: boolean;
  archivedAt: string | null;
  isMainUnit: boolean;
}

interface Product {
  id: number;
  brand: string;
  name: string;
  image: string;
  description: string;
  mainProductUnitName: string;
  mainProductUnitPrice: number;
  mainProductUnitStock: number;
  subCategoryId: number;
  productTypeId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  ProductUnits: ProductUnit[];
}

const ProductContainer = () => {
  const [productList, setProductList] = useState([]);
  const selectedSubCategory = useSelector(selectSelectedSubCategory);
  const { data: products, isLoading } = useGetProductsBySubCategoryIdQuery(
    selectedSubCategory?.id,
  );

  useEffect(() => {
    if (products) {
      setProductList(products.Product);
    }
    console.log("products", productList);
  }, [products, productList]);

  return (
    <div className="flex flex-col w-full justify-center">
      {productList.length > 0 && (
        <div className="flex flex-wrap space-x-2">
          {productList.map((product: Product, index: number) => (
            <>
              {product.mainProductUnitStock > 0 ? (
                <div className="mx-1" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ) : (
                <div className="mx-1" key={product.id}>
                  <ProductCardOutOfStock product={product} />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
