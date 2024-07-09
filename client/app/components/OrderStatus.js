'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { API_URL } from '../utils/constant';
import { api } from '../utils/api';
import { useCartContext } from '../context/CartProvider';
import { convertDateToID } from '../utils/convertDate';
import Image from 'next/image';
import { convertMoney } from '../utils/convertMoney';

const OrderStatus = () => {
  const [data, setData] = useState(null);

  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id');

  const { changeSnapShow } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      changeSnapShow(true);
      const response = await api.get(
        `/api/transaction-data/?orderId=${orderId}`,
        { timeout: 60000 },
      );
      let products = [];

      for (const order of response.data.order_details) {
        const product = await api.get(
          `/api/product/detail/?id=${order.productId}`,
          { timeout: 60000 },
        );
        products.push(product.data);
      }

      // set Data
      const createdAt = convertDateToID(response.data.createdAt);
      const updatedAt = convertDateToID(response.data.updatedAt);
      setData(() => {
        return {
          ...response.data,
          createdAt,
          updatedAt,
          order_details: products,
        };
      });
    };
    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mx-auto bg-secondary text-white w-[80vw] my-12 p-12 rounded-xl">
        {/* Headers */}
        <div className="flex justify-between">
          <p>Order ID: {data?.id}</p>
          <p>Created At: {data?.createdAt}</p>
        </div>
        <div className="flex justify-center flex-col items-center my-12">
          <h2>Status Order:</h2>
          <h2> {data?.status}</h2>
        </div>

        {/* Order Product Details */}
        <div>
          <h2 className="my-6">Order Details:</h2>
          {data?.order_details.map((product) => (
            <div
              className="flex justify-between mx-auto w-4/5 my-12"
              key={product?.id}
            >
              <div className="flex gap-6">
                <Image
                  src={`${API_URL}/${product?.product_imgs[0].img_url}`}
                  width={120}
                  height={120}
                  alt={product?.id}
                />
                <div className="flex flex-col justify-between">
                  <p>{product?.name}</p>
                  <p>Size {product?.size}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p>{convertMoney(product?.price)}</p>
                <p>Quantity 1</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Data */}
        <div className="grid grid-cols-12 mt-12 gap-10">
          <div className="grid col-span-6 grid-cols-3">
            <h2>Payment Method</h2>
            <h2>:</h2>
            <h2>
              {data?.payment_method ? data?.payment_method : 'Not paid yet'}
            </h2>
          </div>
          <div className="grid col-span-6 grid-cols-3">
            <h2>Total Payment</h2>
            <h2>:</h2>
            <h2>{convertMoney(data?.total)}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-12 gap-10">
          <div>
            <h2 className="text-center text-xl">Customer</h2>
            <div className="grid grid-cols-12 gap-1">
              <div className="grid col-span-12 grid-cols-3">
                <h2>Name</h2>
                <h2>:</h2>
                <h2>{data?.customers.name}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Email</h2>
                <h2>:</h2>
                <h2>{data?.customers.email}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Phone</h2>
                <h2>:</h2>
                <h2>{data?.customers.phone}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Address</h2>
                <h2>:</h2>
                <h2>{data?.customers.address}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>City</h2>
                <h2>:</h2>
                <h2>{data?.customers.city}</h2>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-center text-xl">Shipment</h2>
            <div className="grid grid-cols-12 gap-1">
              <div className="grid col-span-12 grid-cols-3">
                <h2>Courier</h2>
                <h2>:</h2>
                <h2>{data?.shipments.courier.toUpperCase()}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Services</h2>
                <h2>:</h2>
                <h2>{data?.shipments.services}</h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Receipt Number</h2>
                <h2>:</h2>
                <h2>
                  {data?.shipments.receipt_number
                    ? data?.shipments.receipt_number
                    : 'Not shipping yet'}
                </h2>
              </div>
              <div className="grid col-span-12 grid-cols-3">
                <h2>Shipping Cost</h2>
                <h2>:</h2>
                <h2>{convertMoney(data?.shipments.shipping_cost)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-end mt-12">
          <p>Last Updated: {data?.updatedAt}</p>
        </div>
      </section>
    </Suspense>
  );
};

export default OrderStatus;
