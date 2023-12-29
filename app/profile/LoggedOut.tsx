import { ICONS } from "@/constants/iconConstants";
import IconButton from "@/components/icon-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const LoggedOut: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <section className="mb-4">
        <IconButton
          icon={<Image src={ICONS.person} alt="person-icon" />}
          onClick={() => router.push("/auth")}
        >
          Giriş Yap
        </IconButton>
        <IconButton
          icon={<Image src={ICONS.personAdd} alt="person-add-icon" />}
          onClick={() => router.push("/auth")}
        >
          Kayıt Ol
        </IconButton>
      </section>
      <section className="mb-4">
        <Link href={"/addresses"}>
          <IconButton
            icon={<Image src={ICONS.address} alt="address-icon" />}
            onClick={() => router.push("/profile/addresses")}
          >
            Adreslerim
          </IconButton>
        </Link>
        <Link href={"/favorites"}>
          <IconButton icon={<Image src={ICONS.favorites} alt="payment-icon" />}>
            Favori Ürünler
          </IconButton>
        </Link>
        <Link href={"/contact-us"}>
          <IconButton
            icon={
              <Image
                className="h-8 w-8"
                src={ICONS.contact}
                alt="contact-icon"
              />
            }
          >
            Bize Ulaşın
          </IconButton>
        </Link>
        <Link href={"/faq"}>
          <IconButton
            icon={
              <Image
                className="h-8 w-8"
                src={ICONS.SSS}
                alt="sozlesmeler-icon"
              />
            }
          >
            Çok Sorulan Sorular
          </IconButton>
        </Link>
        <Link href={"/terms"}>
          <IconButton
            icon={
              <Image
                className="h-8 w-8"
                src={ICONS.agreement}
                alt="sozlesmeler-icon"
              />
            }
            onClick={() => {}}
          >
            Sözleşmeler ve Politikalar
          </IconButton>
        </Link>
      </section>
      <section className="my-4">
        <span className="m-1">Dil - Language</span>
        <section className="mt-4">
          <IconButton onClick={() => {}}>Türkçe</IconButton>
          <IconButton
            rightIcon={false}
            rightString={"1.0.0"}
            onClick={() => {}}
          >
            Versiyon
          </IconButton>
        </section>
      </section>
    </>
  );
};

export default LoggedOut;
