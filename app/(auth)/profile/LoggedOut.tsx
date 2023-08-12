import Image from "next/image";
import {useRouter} from "next/navigation";

import {ICONS} from "@/constants/iconConstants";
import IconButton from "@/components/icon-button";
import React from "react";

const LoggedOut:React.FC = () => {
    const router = useRouter();

    return (
        <>
            <div className="mb-4">
                <IconButton icon={
                    <Image src={ICONS.person} alt="person-icon"/>
                } onClick={() => router.push('/login')}>
                    Giriş Yap
                </IconButton>
                <IconButton icon={
                    <Image src={ICONS.personAdd} alt="person-add-icon"/>
                } onClick={() => router.push('/signup')}>
                    Kayıt Ol
                </IconButton>
            </div>
            <div className="mb-4">
                <IconButton icon={<Image src={ICONS.address} alt="address-icon"/>} onClick={() =>
                    router.push('/profile/addresses')
                }>
                    Adreslerim
                </IconButton>
                <IconButton icon={<Image src={ICONS.favorites} alt="favorites-icon"/>}
                            onClick={() => console.log('Heart icon clicked')}>
                    Favoriler
                </IconButton>
                <IconButton icon={<Image src={ICONS.contact} alt="bizeulasin-icon"/>}
                            onClick={() => console.log('Heart icon clicked')}>
                    Bize Ulaşın
                </IconButton>
                <IconButton icon={<Image src={ICONS.SSS} alt="sozlesmeler-icon"/>}
                            onClick={() => console.log('Heart icon clicked')}>
                    Sıkça Sorulan Sorular
                </IconButton>
                <IconButton icon={<Image src={ICONS.agreement} alt="sozlesmeler-icon"/>}
                            onClick={() => console.log('Heart icon clicked')}>
                    Sözleşmeler ve Politikalar
                </IconButton>
            </div>
            <div className="my-4">
                <span className="m-1">Dil - Language</span>
                <div className="mt-4">
                    <IconButton onClick={() => console.log('Heart icon clicked')}>
                        Türkçe
                    </IconButton>
                    <IconButton rightIcon={false} rightString={"1.0.0"}
                                onClick={() => console.log('Heart icon clicked')}>
                        Versiyon
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default LoggedOut;
