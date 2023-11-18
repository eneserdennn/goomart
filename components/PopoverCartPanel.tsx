import CartProduct from "@/components/product-cards/CartProduct";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  selectCart,
  setCartFromLocalStorage,
} from "@/redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "@/redux/features/cart/cartApiSlice";
import { useCheckCartMutation } from "@/redux/features/order/orderApiSlice";
import Loading from "@/app/loading";
import Image from "next/image";
import { IMAGES } from "@/constants/imageConstants";

interface TopLevelObject {
  totalPrice: number;
  products: Product[];
}

interface Product {
  productId: number;
  unitId: number;
  quantityInProductUnit: number;
  mainProductUnitDiscountAmount: number;
  productItself: ProductDetails;
  productUnitItself: ProductUnit;
  calculatedPrice: number;
}

interface ProductDetails {
  id: number;
  brand: string;
  name: string;
  description: string;
  image: string;
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
  ProductType: ProductType;
  SubCategory: SubCategory;
}

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

interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
}

interface SubCategory {
  id: number;
  name: string;
  description: string;
  order: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
  Category: Category;
}

interface Category {
  id: number;
  name: string;
  description: string;
  order: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  archivedAt: string | null;
}

const PopoverCartPanel = () => {
  const token = useSelector(selectCurrentToken);
  const cart = useSelector(selectCart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { data, isLoading, isError, isSuccess, error } = useGetCartQuery({});
  const [
    checkCart,
    {
      isLoading: checkLoading,
      isSuccess: successCheck,
      data: dataCheck,
      error: errorCheck,
    },
  ] = useCheckCartMutation();

  useEffect(() => {
    if (token) {
      const requestData = {
        deliveryAddressId: 1,
      };
      checkCart(requestData);
    }

    // if (!token) {
    //     dispatch(setCartFromLocalStorage());
    // }
  }, []);

  useEffect(() => {
    setTotalPrice(data?.totalPrice);
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  let content;

  if (isLoading) {
    return <Loading />;
  } else if (isError && (error as any).status === 401) {
    content = (
      <div className="bg-rose-500 h-[500px] w-[500px]">Card not checked</div>
    );
  } else if (successCheck)
    content = (
      <div className=" h-[500px] w-[500px] rounded-b-2xl">
        {data?.products.length > 0 ? (
          data?.products?.map((item: Product) => (
            <CartProduct
              // @ts-ignore
              product={item.productItself}
              // @ts-ignore
              key={item.id}
              qty={item.quantityInProductUnit}
            />
          ))
        ) : (
          <div className="flex justify-center pt-20">
            <div className="flex flex-col items-center">
              <Image
                src={IMAGES.emptyCart}
                alt={"empty-cart"}
                width={250}
                height={215}
              />
              <span className="text-primary font-bold text-[16px] pt-12">
                Sepetinizde Ürün Bulunmamaktadır.
              </span>
              <span className="text-[15px] pt-2">
                Ana sayfadan sepetinize ürün ekleyebilirsiniz.
              </span>
            </div>
          </div>
        )}
      </div>
    );

  return content;
};

export default PopoverCartPanel;
