'use server';

import Card from '@/app/components/Card';
import { api } from '@/app/utils/api';
import { capitalizeFirstLetter } from '@/app/utils/capitalize';
import React from 'react';

const CategoryPage = async ({ searchParams }) => {
  const category = await api.get(
    `/api/category/name/?name=${searchParams.name}`,
  );

  const allProductsByCategory = await api.get(
    `/api/all-product-category/?categoryId=${category.data.id}`,
  );

  return (
    <section className="container min-h-screen">
      <h2 className="my-10 font-bold text-2xl">
        {capitalizeFirstLetter(category.data.name)}
      </h2>
      <div className="grid-homepage">
        {allProductsByCategory.data.map((product, i) => (
          <Card data={product} key={i} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
