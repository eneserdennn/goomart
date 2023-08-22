'use client'
import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";

const ContactUsPage = () => {

    const info = [
        {
            title: 'Telefon',
            icon: ICONS.phone,
            text: '+49 145 034 123 00'
        },
        {
            title: 'E-posta',
            icon: ICONS.email,
            text: 'Info@goomart.com'
        },
        {
            title: 'Whatsapp Destek',
            icon: ICONS.whatsappIcon,
            text: '08:00-00.00 saatleri arasinda bize ulasabilirsiniz.'
        }
    ]


    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-[20px] mb-[20px]">
                <span className="text-[14px] text-[#6D6D6D] font-bold pb-[20px]">Bizimle Iletisime Gecin</span>
                {info.map((item, index) => (
                    <div
                        key={index}
                        className="flex p-[20px] font-bold text-[15px] mb-[20px] justify-between items-center bg-white rounded-md">
                        <div className="flex flex-col">
                            <span className="text-primary mb-2">
                                {item.title}
                            </span>
                            <span className="text-deepgray">
                                {item.text}
                            </span>
                        </div>
                        <div>
                        </div>
                        <div>
                            <Image src={item.icon} alt={"phone-icon"} className="h-6 w-6"/>
                        </div>
                    </div>
                ))}
            </div>
            <span className="text-[14px] text-center text-[#6D6D6D] font-bold pb-[20px]">Sosyal Medya</span>
            <div className="flex flex-row justify-between bg-white p-[20px]">
                <Image src={ICONS.instagram} alt={"instagram-icon"} className="h-[36px] w-[36px]"/>
                <Image src={ICONS.facebook} alt={"facebook-icon"} className="h-[36px] w-[36px]"/>
                <Image src={ICONS.tiktok} alt={"tiktok-icon"} className="h-[36px] w-[36px]"/>
                <Image src={ICONS.youtube} alt={"youtube-icon"} className="h-[36px] w-[36px]"/>
            </div>
        </div>
    );
};

export default ContactUsPage;

// <div className="flex p-[20px] font-bold text-[15px] justify-between items-center bg-white rounded-md">
//     <div className="flex flex-col">
//                 <span className="text-primary mb-2">
//                     Telefon
//                 </span>
//         <span className="text-deepgray">
//                     +49 145 034 123 00
//                 </span>
//     </div>
//     <div>
//         <Image src={ICONS.phone} alt={"phone-icon"} className="h-6 w-6"/>
//     </div>
// </div>
