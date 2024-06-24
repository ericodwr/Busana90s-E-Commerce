import React from 'react';
import Card from '../components/Card';
import { api } from '../utils/api';

export const dynamic = 'force-dynamic';

const ProductsPage = async () => {
  const products = await api.get(`/api/product`, { timeout: 60000 });

  return (
    <section className="container min-h-screen">
      <h2 className="my-10 font-bold text-2xl">All Products By Busana90s</h2>
      <div className="grid-homepage">
        {products.data.map((product, i) => (
          <Card data={product} key={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
