import Image from 'next/image';
import React from 'react';

type CategoryCardProps = {
  imageUrl: string;
  title: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {

  if (imageUrl === "") {
    imageUrl = "/placeholder.png";
  }
  return (
    <div className="flex flex-col m-1 shadow-sm rounded-lg overflow-hidden bg-white h-[140px] w-[120px] md:h-[170px] md:w-[170px] md:mb-[42px] md:justify-between md:items-center md:py-[13px]">
      <div className="flex items-center justify-center mx-[5px] my-[7px] h-[83px] bg-blue-100 rounded md:h-[100px] md:w-[120px]">
        <Image src={imageUrl} alt={title} width={110} height={83} objectFit="cover" className="p-2" />
      </div>
        <div className="flex items-center justify-center text-center text-[#363636] font-bold text-[13px] md:text-[16px] md:font-semibold">
            {title}
      </div>
    </div>
  );
};

export default CategoryCard;
