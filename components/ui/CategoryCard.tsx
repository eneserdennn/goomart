import Image from 'next/image';
import React from 'react';

type CategoryCardProps = {
  imageUrl: string;
  title: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col items-center justify-center shadow-sm p-1 rounded-lg overflow-hidden bg-white h-36 max-w-xs">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
        <Image src={imageUrl} alt={title} width={64} height={64} objectFit="contain" />
      </div>
      <span className="text-sm mt-1 text-center"
      style={{
        color: '#444444',
        fontWeight: 'semibold',
      }}
      >{title}</span>
    </div>
  );
};

export default CategoryCard;
