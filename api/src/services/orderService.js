const { v4 } = require('uuid');
const axios = require('axios');
const emailjs = require('@emailjs/nodejs');

const {
  Order,
  Shipment,
  Customer,
  Order_Details,
} = require('../db/models/index.js');
const { ResponseError } = require('../error/response-error.js');

const {
  PENDING_PAYMENT,
  CANCELED,
  PAID,
  MIDTRANS_SERVER_KEY,
  FRONT_END_URL,
  MIDTRANS_APP_URL,
  MIDTRANS_API_URL,
  SHIPPING,
} = require('../utils/constant.js');

const productService = require('./productService.js');

// Integrated with Midtrans
const create = async (req) => {
  const {
    name,
    email,
    phone,
    address,
    province,
    city,
    courier,
    services,
    shippingCost,
    cartItems,
    total,
  } = req;

  // set model variable
  let order;
  let customer;
  let shipment;

  // Set variable midtrans
  const order_id = v4();
  const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);
  const item_details = cartItems.map((product) => ({
    id: product.id,
    price: product.price,
    quantity: product.quantity,
    name: product.name,
  }));

  // Add Shipping price
  item_details.push({
    id: v4(),
    price: Number(shippingCost),
    quantity: 1,
    name: 'Shipping Cost',
  });

  const payload = {
    transaction_details: {
      order_id,
      gross_amount: cartItems.reduce(
        (total, product) => total + product.price,
        Number(shippingCost),
      ),
    },
    item_details,
    customer_details: {
      first_name: name,
      email,
      phone,
      shipping_address: {
        address,
        city,
      },
    },
    expiry: {
      unit: 'minutes',
      duration: 1,
    },
    callbacks: {
      finish: `${FRONT_END_URL}/order-status`,
      error: `${FRONT_END_URL}/order-status`,
      pending: `${FRONT_END_URL}/order-status`,
    },
  };
  // /order-status?transaction_id=${order_id}

  // fetch to midtrans
  const response = await axios.post(
    `${MIDTRANS_APP_URL}/snap/v1/transactions`,
    JSON.stringify(payload),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
    },
  );

  if (response.status !== 201) {
    throw new ResponseError(500, 'Failed to create transaction');
  }

  // Create Model
  await Customer.build({
    id: v4(),
    name,
    phone,
    email,
    address,
    province,
    city,
  })
    .save()
    .then((res) => {
      customer = res;
    })
    .catch((err) => console.log(err));

  await Shipment.build({
    id: v4(),
    courier,
    services,
    shipping_cost: shippingCost,
  })
    .save()
    .then((res) => (shipment = res))
    .catch((err) => console.log(err));
  await Order.build({
    id: order_id,
    status: PENDING_PAYMENT, //belum bayar
    total,
    customerId: customer.id,
    shipmentId: shipment.id,
    snap_token: response.data.token,
    snap_redirect_url: response.data.redirect_url,
  })
    .save()
    .then((res) => {
      order = res;
    })
    .catch((err) => console.log(err));

  // looping order details
  for (const item of cartItems) {
    await Order_Details.build({
      id: v4(),
      productId: item.id,
      price: item.price,
      orderId: order.id,
    })
      .save()
      .then((res) => {})
      .catch((err) => console.log(err));

    await productService.updateProductStatus(item.id, false);
  }
  // Create Model

  return {
    message: 'success create order!',
    snap_token: response.data.token,
    snap_redirect_url: response.data.redirect_url,
  };
};

const getAll = async () => {
  const orders = await Order.findAll({
    include: ['customers', 'shipments', 'order_details'],
  });

  return orders;
};

const updateOrderData = async (req) => {
  const { order_id, transaction_status, fraud_status, payment_type } = req;

  const order = await Order.findOne({
    where: {
      id: order_id,
    },
    include: 'order_details',
  });

  if (!order) throw new ResponseError(404, 'Order not found!');

  if (transaction_status == 'capture') {
    if (fraud_status == 'accept') {
      order.status = PAID;
      order.payment_method = payment_type;
    }
  } else if (transaction_status == 'settlement') {
    order.status = PAID;
    order.payment_method = payment_type;
  } else if (
    transaction_status == 'cancel' ||
    transaction_status == 'deny' ||
    transaction_status == 'expire'
  ) {
    order.status = CANCELED;
    for (const orderDetails of order.order_details) {
      await productService.updateProductStatus(orderDetails.productId, true);
    }
  } else if (transaction_status == 'pending') {
    order.status = PENDING_PAYMENT;
  }
  await order.save();

  return 'yes';
};

// response from midtrans
const getTransactionData = async (orderId) => {
  const authString = btoa(`${MIDTRANS_SERVER_KEY}:`);

  const response = await axios.get(`${MIDTRANS_API_URL}/v2/${orderId}/status`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${authString}`,
    },
  });

  await updateOrderData(response.data);

  const orderData = await Order.findOne({
    where: {
      id: orderId,
    },
    include: ['customers', 'shipments', 'order_details'],
  });

  return orderData;
};

// Update receipt number
const updateReceiptNumber = async (req) => {
  emailjs.init({
    publicKey: 'V28ySbd23WNINhwdg',
    privateKey: 'wqnUvDyLKWNtzSxJ3487Q',
  });

  const { id, receipt_number } = req;

  const shipment = await Shipment.findByPk(id);

  shipment.receipt_number = receipt_number;

  await shipment.save();

  const order = await Order.findOne({
    where: {
      shipmentId: id,
    },
    include: ['customers', 'shipments', 'order_details'],
  });

  order.status = SHIPPING;
  await order.save();

  // template_eiuy0yt

  const data = {
    orderId: order.id,
    name: order.customers.name,
    email: order.customers.email,
    courier: order.shipments.courier.toUpperCase(),
    services: order.shipments.services,
    receipt_number: order.shipments.receipt_number,
  };

  await emailjs.send('service_5k8ddgt', 'template_eiuy0yt', data);

  return { message: 'Update Receipt Number Successfully!' };
};

// Get Order by status
const getOrderPaid = async () => {
  const orders = await Order.findAll({
    where: {
      status: PAID,
    },
  });
  return orders;
};

const getOrderCanceled = async () => {
  const orders = await Order.findAll({
    where: {
      status: CANCELED,
    },
  });
  return orders;
};

const getOrderShipping = async () => {
  const orders = await Order.findAll({
    where: {
      status: SHIPPING,
    },
  });
  return orders;
};

module.exports = {
  create,
  getAll,
  getTransactionData,
  updateReceiptNumber,
  getOrderPaid,
  getOrderCanceled,
  getOrderShipping,
  updateOrderData,
};
