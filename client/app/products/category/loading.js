import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center animate-pulse">
      <Image
        className="h-40 w-40"
        width={0}
        height={0}
        src="/logo.svg"
        alt="Busana90s Logo"
        priority
      />
    </div>
  );
};

export default Loading;
