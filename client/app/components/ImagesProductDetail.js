'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const ImagesProductDetail = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${images[index].img_url}`}
          width={240}
          height={240}
          alt="big images"
          className="size-[333px]"
        />
      </div>
      <div className="flex gap-12 mt-6 overflow-x-auto pb-4">
        {images.map((img, i) => (
          <Image
            key={img.id}
            src={`${process.env.NEXT_PUBLIC_API_URL}/${img.img_url}`}
            width={240}
            height={240}
            alt={`product-${i}`}
            className={`size-[108px] bg-cover cursor-pointer hover:border-4 border-primary/50 ${
              index === i ? 'border-4 border-primary/50' : ''
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesProductDetail;
