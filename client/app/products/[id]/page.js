import AddToCartButton from '@/app/components/AddToCartButton';
import Card from '@/app/components/Card';
import ImagesProductDetail from '@/app/components/ImagesProductDetail';
import ProductsByCategory from '@/app/components/ProductsByCategory';
import { api } from '@/app/utils/api';
import { capitalizeFirstLetter } from '@/app/utils/capitalize';
import { convertMoney } from '@/app/utils/convertMoney';
import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-dynamic';

const ProductDetailPage = async ({ params }) => {
  const data = await api.get(`/api/product/detail/?id=${params.id}`, {
    timeout: 60000,
  });

  const products = await (
    await api.get('/api/product', { timeout: 60000 })
  ).data.slice(0, 6);

  return (
    <>
      {data.data && (
        <>
          <section className="grid grid-cols-2 gap-12 container">
            {/* Images */}
            <ImagesProductDetail images={data.data.product_imgs} />

            {/* Information */}
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-12">
                {/* title */}
                <div className="flex flex-col">
                  <h1 className="text-3xl">{data.data.name}</h1>
                  <p className="opacity-50 ">Size {data.data.size}</p>
                  <p className="text-xl font-bold">
                    {convertMoney(data.data.price)}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-bold">Description</h4>
                  <p>{data.data.description}</p>
                </div>
              </div>
              {/* Add to Cart */}
              <AddToCartButton product={data.data} />
            </div>
          </section>

          {/* More from the same categories */}
          <section className="container my-12">
            <div className="flex justify-between">
              <p className="font-bold">
                More from {capitalizeFirstLetter(data.data.categories.name)}
              </p>
              <Link
                className="text-primary hover:text-secondary"
                href={`/products/category/?name=${data.data.categories.name}`}
              >
                See All
              </Link>
            </div>
            <div className="grid-other-product">
              <ProductsByCategory
                categoryId={data.data.categoryId}
                small={true}
              />
            </div>
          </section>

          {/* Other Products */}
          <section className="container my-12">
            <div className="flex justify-between">
              <p className="font-bold">Other Products</p>
              <Link
                className="text-primary hover:text-secondary"
                href={'/products'}
              >
                See All
              </Link>
            </div>
            <div className="grid-other-product">
              {products.map((product, i) => (
                <Card data={product} small={true} key={i} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;
