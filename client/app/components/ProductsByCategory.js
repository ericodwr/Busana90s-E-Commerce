import axios from 'axios';
import React from 'react';
import Card from './Card';

const ProductsByCategory = async ({ categoryId, small }) => {
  const allProductsByCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/all-product-category/?categoryId=${categoryId}`,
  );

  return (
    <>
      {allProductsByCategory.data.map((product, i) => (
        <Card data={product} small={small} key={i} />
      ))}
      {!allProductsByCategory.data.length && (
        <h2 className="text-3xl ">No products!</h2>
      )}
    </>
  );
};

export default ProductsByCategory;
