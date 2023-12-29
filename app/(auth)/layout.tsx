import Container from "@/components/ui/container";
import { ICONS } from "@/constants/iconConstants";
import { IMAGES } from "@/constants/imageConstants";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  signup: React.ReactNode;
}) {
  return (
    <>
      <div className={`bg-white md:relative w-full h-[398px]`}>
        <div className="absolute hidden md:block top-0 left-0 w-full h-full">
          <Image src={IMAGES.loginbg} alt="goomart" />
        </div>
        <Container className="flex items-center flex-col m-1 relative md:max-w-[500px] bg-white md:mx-auto md:shadow-2xl md:my-10 md:py-[30px] md:rounded-[25px]">
          <button className="hidden md:flex items-center justify-between w-full mb-2 pt-[10px] ">
            <Image
              src={ICONS.leftarrowblack}
              width={20}
              height={20}
              alt="goomart"
            />
            <p className="w-full font-bold text-[17px]">Şifremi Unuttum</p>
          </button>
          <div className="w-full">{children}</div>
        </Container>
      </div>
    </>
  );
}
