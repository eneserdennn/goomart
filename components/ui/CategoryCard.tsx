import Image from 'next/image';
import React from 'react';

type CategoryCardProps = {
  imageUrl: string;
  title: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col m-1 shadow-sm rounded-lg overflow-hidden bg-white h-[140px] w-[120px]">
      <div className="flex items-center justify-center mx-[5px] my-[7px] h-[83px] bg-blue-100 rounded">
        <Image src={imageUrl} alt={title} width={110} height={83} objectFit="cover" className="p-2" />
      </div>
        <div className="flex items-center justify-center text-center font-bold text-[13px]">
            Nudeln & Rise Bulgur
      </div>
    </div>
  );
};

export default CategoryCard;
