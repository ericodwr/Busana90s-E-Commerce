import Card from './components/Card';
import { capitalizeFirstLetter } from './utils/capitalize';
import Link from 'next/link';
import ProductsByCategory from './components/ProductsByCategory';
import { api } from './utils/api';
import Banner from './components/Banner';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await api.get('/api/product-latest', { timeout: 60000 });

  const categories = await api.get('/api/category-client', { timeout: 60000 });

  const banners = await api.get('/api/banner-active', { timeout: 60000 });

  return (
    <main className="min-h-screen">
      <section className="banner">
        <Banner banners={banners.data} />
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
              <ProductsByCategory limit={true} categoryId={data.id} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
