import Image from 'next/image';
import Card from './components/Card';
import axios from 'axios';
import { capitalizeFirstLetter } from './utils/capitalize';
import Link from 'next/link';
import ProductsByCategory from './components/ProductsByCategory';
import { api } from './utils/api';

export default async function Home() {
  const products = await api.get('/api/product-latest');

  const categories = await api.get('/api/category');

  return (
    <main className="min-h-screen">
      <section className="banner">
        <Image
          src={'banner.svg'}
          width={0}
          height={0}
          className="w-screen h-full"
          priority
          alt="Banner"
        />
      </section>

      <section className="container">
        {/* New Products */}
        <div>
          <div className="flex justify-between my-4">
            <h4 className="text-2xl font-bold">New Products</h4>
            <Link
              className="text-primary hover:text-secondary"
              href={'/products'}
            >
              See All
            </Link>
          </div>
          <div className="grid-homepage">
            {products.data.map((product, i) => (
              <Card data={product} key={i} />
            ))}
          </div>
        </div>

        {categories.data.map((data, i) => (
          <div key={i}>
            <div className="flex justify-between my-4">
              <h4 className="text-2xl font-bold">
                {capitalizeFirstLetter(data.name)}
              </h4>
              <Link
                className="text-primary hover:text-secondary"
                href={`/products/category/?name=${data.name}`}
              >
                See All
              </Link>
            </div>
            <div className="grid-homepage">
              <ProductsByCategory categoryId={data.id} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
