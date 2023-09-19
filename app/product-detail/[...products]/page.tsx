import { customError, customSuccess } from "@/components/CustomToast";
import { useEffect, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ICONS } from "@/constants/iconConstants";
import Image from "next/image";
import Loading from "@/app/loading";
import { useAddToCartMutation } from "@/redux/features/cart/cartApiSlice";
import { useDispatch } from "react-redux";
import { useGetProductsByProductIdQuery } from "@/redux/features/products/productApiSlice";

interface ProductDetailProps {
  params: {
    products: string[];
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const dispatch = useDispatch();
  const productId = params.products[0];
  const { data, isLoading, isError, isSuccess } =
    useGetProductsByProductIdQuery(productId);
  const [
    addToCartMutation,
    {
      isLoading: addToCartLoading,
      isError: addToCartError,
      isSuccess: addToCartSuccess,
    },
  ] = useAddToCartMutation();
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    if (data) {
      const requestData = {
        productId: data.id,
        productUnitId: data.ProductUnits[0].id,
        quantityInProductUnit: 1,
      };
      addToCartMutation(requestData);
    }
  };

  useEffect(() => {
    if (addToCartSuccess) {
      customSuccess("Ürün sepete eklendi");
    }
    if (addToCartError) {
      customError("Ürün sepete eklenemedi");
    }
  }, [addToCartSuccess]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="flex flex-col">
      {/* Product Information */}
      {isSuccess && (
        <>
          <div className="flex flex-col relative justify-center items-center pt-[15px] pb-[41px] bg-white">
            {/* Remaining JSX of the product details... */}
          </div>
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
            {/* Remaining JSX of the action buttons... */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
