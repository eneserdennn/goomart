"use client";

import * as Yup from "yup";

import { Form, Formik, useField } from "formik";
import Image, { StaticImageData } from "next/image";
import {
  selectAddress,
  selectCargo,
  selectPayment,
  selectPrice,
} from "@/redux/features/checkout/checkOutSlice";
import { useDispatch, useSelector } from "react-redux";

import { ICONS } from "@/constants/iconConstants";
// @ts-ignore
import InputMask from "react-input-mask";
import React from "react";
import { usePlaceAnOrderMutation } from "@/redux/features/order/orderApiSlice";
import { useRouter } from "next/navigation";

interface IconInputProps {
  icon: StaticImageData;
  mask?: string;
  name: string;
  type: string;
  placeholder: string;
}

const IconInput: React.FC<IconInputProps> = ({
  icon: Icon,
  mask,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : null;

  return (
    <div className="flex flex-col mb-4">
      <div className="relative">
        <InputMask
          mask={mask || ""}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        >
          {
            // @ts-ignore
            (inputProps) => (
              <input
                {...props}
                {...inputProps}
                className={`appearance-none border ${
                  errorText ? "border-red-500" : "border-0"
                } p-[15px] h-[53px] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10`} // px değerini sağa aldık (pr-10)
              />
            )
          }
        </InputMask>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Image src={Icon} alt={"icon"} width={18} height={18} />
        </div>
      </div>
      {errorText && (
        <div className="mt-1 text-xs text-red-500">{errorText}</div>
      )}
    </div>
  );
};

const IconInputNoMask: React.FC<IconInputProps> = ({
  icon: Icon,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : null;

  return (
    <div className="flex flex-col mb-4">
      <div className="relative">
        <input
          {...field}
          {...props}
          className={`appearance-none border ${
            errorText ? "border-red-500" : "border-0"
          } p-[15px] h-[53px] rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10`} // px değerini sağa aldık (pr-10)
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Image src={Icon} alt={"icon"} width={18} height={18} />
        </div>
      </div>
      {errorText && (
        <div className="mt-1 text-xs text-red-500">{errorText}</div>
      )}
    </div>
  );
};

const CardValidationSchema = Yup.object().shape({
  nameAndSurname: Yup.string()
    .required("Kart üzerindeki isim zorunludur.")
    .min(2, "Kart üzerindeki isim çok kısa.")
    .max(50, "Kart üzerindeki isim çok uzun."),
  cardNumber: Yup.string()
    .required("Kart numarası zorunludur.")
    .matches(/(\d{4}\s\d{4}\s\d{4}\s\d{4})/, "Kart numarası geçerli değil."),
  monthAndYear: Yup.string()
    .required("Son kullanma tarihi zorunludur.")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Son kullanma tarihi geçerli değil.")
    .test(
      "expiration-date",
      "Son kullanma tarihi geçmiş bir tarihe ait olamaz.",
      (value) => {
        if (!value) return false;

        const [month, year] = value.split("/").map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // 2 digit representation of year
        const currentMonth = currentDate.getMonth() + 1; // months start from 0 in JS

        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;

        return true;
      }
    ),
  cvc: Yup.string()
    .required("CVC zorunludur.")
    .matches(/\d{3}/, "CVC geçerli değil."),
});

const CardPayment: React.FC = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const price = useSelector(selectPrice);
  const address = useSelector(selectAddress);
  const cargo = useSelector(selectCargo);
  const payment = useSelector(selectPayment);

  const [placeAnOrder, { isLoading }] = usePlaceAnOrderMutation();

  return (
    <div className="flex flex-col w-full py-[20px]">
      <Formik
        initialValues={{
          nameAndSurname: "",
          cardNumber: "",
          monthAndYear: "",
          cvc: "",
        }}
        validationSchema={CardValidationSchema}
        onSubmit={(values) => {
          router.push("/checkout/order-confirmation");
          console.log(values);
          placeAnOrder({
            // @ts-ignore
            deliveryAddressId: address.id,
            // @ts-ignore
            invoiceAddressId: address.id,
          });
        }}
      >
        {(formik) => (
          <Form className="flex flex-col w-full px-[15px]">
            <div>
              <IconInputNoMask
                name="nameAndSurname"
                type="text"
                placeholder="Kart Üzerindeki Isim"
                icon={ICONS.personGray}
              />
              <IconInput
                name="cardNumber"
                type="text"
                placeholder="Kart Numarasi"
                icon={ICONS.creditCard}
                mask="9999 9999 9999 9999"
              />
            </div>
            <div className="flex pb-[20px]">
              <div>
                <IconInput
                  name="monthAndYear"
                  type="text"
                  placeholder="Ay / Yil"
                  icon={ICONS.calendar}
                  mask="99/99"
                />
              </div>
              <div className="flex ml-2">
                <div>
                  <IconInput
                    name="cvc"
                    type="text"
                    placeholder="CVC"
                    icon={ICONS.lock}
                    mask="999"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary text-white h-[53px] rounded-tl-3xl rounded-br-3xl"
            >
              {price} € Öde
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex flex-row h-[53px] bg-white mt-[40px] items-center justify-between px-[105px]">
        <Image src={ICONS.visa} alt={"visa"} width={36} height={24} />
        <Image
          src={ICONS.mastercard}
          alt={"mastercard"}
          width={36}
          height={24}
        />
        <Image
          src={ICONS.americanexp}
          alt={"americanexp"}
          width={36}
          height={24}
        />
        <Image src={ICONS.discover} alt={"discover"} width={36} height={24} />
      </div>
    </div>
  );
};

export default CardPayment;
