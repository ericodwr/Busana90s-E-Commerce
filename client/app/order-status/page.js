import React from 'react';
import { Suspense } from 'react';
import OrderStatus from '../components/OrderStatus';

const OrderStatusPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <OrderStatus />
      </div>
    </Suspense>
  );
};

export default OrderStatusPage;
