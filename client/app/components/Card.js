import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ small, data }) => {
  const { name, size, price, product_imgs, id } = data;
  return (
    <Link
      className={`${small ? 'w-[11vw]' : ' w-[17vw]'} h-445px`}
      href={`/products/${id}`}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${product_imgs[0].img_url}`}
        className="w-full h-4/5"
        width={240}
        height={240}
        alt="clothes"
      />
      <h4>{name}</h4>
      <p>{size}</p>
      <p>Rp. {price}</p>
    </Link>
  );
};

export default Card;
