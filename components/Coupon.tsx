import Image from "next/image";
import {ICONS} from "@/constants/iconConstants";

const Coupon = ({coupon}) => {
    const {name, description, amount, minCart, endDate, code} = coupon;
    return (
        <div className="flex items-center justify-center py-4  bg-gray-100">
            <div className="w-11/12 md:w-5/12 lg:w-4/12 relative overflow-visible">
                <div
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#F3F4F6] shadow-inner rounded-full"></div>
                <div
                    className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 -translate-x-1/2 w-5 h-10 bg-[#F3F4F6]"></div>
                <div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#F3F4F6] shadow-inner rounded-full"></div>
                <div
                    className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 translate-x-1/2 w-5 h-10 bg-[#F3F4F6]"></div>

                <div className="bg-white h-[166px] shadow-lg rounded-xl pt-2">
                    <div className="flex justify-between">
                        <div className="text-[14px] font-bold px-8">{name}</div>
                        <div className="text-[18px] text-primary px-4 font-bold">{amount} €</div>
                    </div>
                    <div className="text-[12px] text-deepgray font-bold px-8 mb-[10px]">{description}
                    </div>

                    {/*dashed*/}
                    <div className="flex justify-center mt-3" style={{
                        pointerEvents: 'none',
                    }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex w-4/5 mx-auto ">
                                {Array.from({length: 22}).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 h-0.5 rounded-full bg-gray-300 mr-1"></div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="flex mt-4 flex-row justify-between items-center">
                        <div className="mt-3 font-bold text-deepgray text-[12px] ml-8">
                            <p className="mb-1">Min. Sepet Tutarı: <span className="text-black">{minCart} €</span></p>

                            <span>
                              Bitis: {new Date(coupon.endDate).toLocaleDateString('tr-TR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                              })}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-3 mr-8 font-bold text-deepgray text-[12px] z-9">
                            <span className="text-primary text-[13px] font-bold mb-1">{code}</span>
                            <div
                                className="clickable-container" // Add a class for styling and interaction
                                onClick={() => {
                                    navigator.clipboard.writeText(code);
                                    console.log('test')
                                }}
                            >
                                <button className="bg-primary text-white rounded-md w-[107px] h-[35px] text-[15px] flex justify-center items-center">
                                    Kopyala
                                    {/*<Image className="ml-1" src={ICONS.copy} alt="copy" width={15} height={15} />*/}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupon;
