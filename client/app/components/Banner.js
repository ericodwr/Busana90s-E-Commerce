'use client';

import Image from 'next/image';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Banner = ({ banners }) => {
  const properties = {
    prevArrow: <button></button>,
    nextArrow: (
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };

  const indicators = (index) => <div className="indicator"></div>;

  return (
    <div>
      <Slide
        prevArrow={properties.prevArrow}
        nextArrow={properties.nextArrow}
        indicators={indicators}
      >
        {banners.map((banner) => (
          <div
            className="each-slide-effect h-[650px] relative bg-cover"
            key={banner.id}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${banner.img_url}`}
              alt={`${banner.title}`}
              className="w-full"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Banner;
