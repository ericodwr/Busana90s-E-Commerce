const express = require('express');
const path = require('path');
const fs = require('fs');
const exceljs = require('exceljs');
const excelRouter = new express.Router();

const { Product, Order, Order_Details } = require('../db/models/index.js');

const data = {
  books: [
    {
      idn: '912831823',
      title: 'Eloquent Javascript',
      author: 'ocire dwi',
      pages: '591',
      description: 'descriptions',
    },
    {
      idn: '123123123',
      title: 'Javascript',
      author: 'erico dwi',
      pages: '102',
      description: 'descriptions second',
    },
    {
      idn: '92134123',
      title: 'Eloquent HTML',
      author: 'ocire iwd',
      pages: '292',
      description: 'descriptions third',
    },
    {
      idn: '91247123',
      title: 'Eloquent Request',
      author: 'ergo dwi',
      pages: '842',
      description: 'descriptions',
    },
    {
      idn: '912831823',
      title: 'Eloquent Javascript',
      author: 'ocire dwi',
      pages: '591',
      description: 'descriptions',
    },
  ],
};

// Export products
excelRouter.get('/api/export/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    let workbook = new exceljs.Workbook();

    const sheet = workbook.addWorksheet('products');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Size', key: 'size' },
      { header: 'Description', key: 'description' },
      { header: 'Price', key: 'price' },
      { header: 'Status', key: 'status' },
    ];

    await products.map((product) => {
      const { dataValues } = product;
      sheet.addRow({
        id: dataValues.id,
        name: dataValues.name,
        size: dataValues.size,
        description: dataValues.description,
        price: dataValues.price,
        status: dataValues.status ? 'Available' : 'Unavailable',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment;filename=' + 'products.xlsx',
    );

    workbook.xlsx.write(res);
  } catch (error) {
    console.log(error);
  }
});

// Export order
excelRouter.get('/api/export/orders', async (req, res, next) => {
  try {
    let workbook = new exceljs.Workbook();
    const orders = await Order.findAll({
      include: ['customers', 'shipments', 'order_details'],
    });

    for (const order of orders) {
      for (let detail of order.order_details) {
        const newDetail = await Order_Details.findOne({
          where: {
            id: detail.id,
          },
          include: ['products'],
        });
        detail = newDetail;
        order.order_details = newDetail;
      }
    }

    for (const order of orders) {
      console.log(order.dataValues.order_details);
    }

    const sheet = workbook.addWorksheet('orders');

    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Status', key: 'status' },
      { header: 'Payment Method', key: 'payment_method' },
      { header: 'Total Price', key: 'total' },
      { header: 'Created At', key: 'createdAt' },
      { header: 'Updated At', key: 'updatedAt' },
      { header: 'Total Product', key: 'total_product' },
      // { header: 'Product Name', key: 'product_name' },
      // { header: 'Product Price', key: 'product_price' },
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Province', key: 'province' },
      { header: 'City', key: 'city' },
      { header: 'Address', key: 'address' },
      { header: 'Courier', key: 'courier' },
      { header: 'Services', key: 'services' },
      { header: 'Shipping Cost', key: 'shipping_cost' },
      { header: 'Receipt Number', key: 'receipt_number' },
    ];

    // let object = JSON.parse(fs.readFileSync(data, 'utf8'));

    // await data.books.map((data, id) => {
    //   sheet.addRow({
    //     idn: data.idn,
    //     title: data.title,
    //     author: data.author,
    //     pages: data.pages,
    //     description: data.description,
    //   });
    // });

    //     {
    //   id: '3',
    //   status: 'CANCEL',
    //   payment_type: 'Not Paid Yet',
    //   total: 50000,
    //   product_name: [
    //     {
    //       name: 'product 21',
    //     },
    //   ],
    //   total_product: 1,
    //   name: 'erico dwi',
    //   email: 'ericow@dr.com',
    //   phone: 8212372,
    // },

    orders.map((item) => {
      const { dataValues } = item;
      const {
        id,
        payment_method,
        order_details,
        status,
        total,
        customers,
        shipments,
        createdAt,
        updatedAt,
      } = dataValues;

      const { name, email, phone, province, city, address } =
        customers.dataValues;
      const { courier, services, shipping_cost, receipt_number } =
        shipments.dataValues;
      // if (order_details.length > 1) {
      //   for (let i = 0; i < order_details.length; i++) {
      //     // const order = await Order_Details.findOne({
      //     //   where: {
      //     //     id: order_details[i].id,
      //     //   },
      //     //   include: ['products'],
      //     // });
      //     if (i == 0) {
      //       sheet.addRow({
      //         id,
      //         status,
      //         payment_method,
      //         total,
      //         total_product: order_details.length,

      //         name,
      //         email,
      //         phone,
      //         province,
      //         city,
      //         address,
      //         courier,
      //         services,
      //         shipping_cost,
      //         receipt_number,
      //       });
      //       // console.log(order.dataValues.products.dataValues.name);
      //       console.log(name, phone, province, city);
      //     } else if (i == order_details.length - 1) {
      //       sheet.addRow({}).border = {
      //         bottom: { style: 'double', color: { argb: 'FF00FF00' } },
      //       };
      //     } else {
      //       // sheet.addRow({});
      //     }
      //   }
      // } else {
      //   // const order = await Order_Details.findOne({
      //   //   where: {
      //   //     id: order_details[0].id,
      //   //   },
      //   //   include: ['products'],
      //   // });
      //   sheet.addRow({
      //     id,
      //     status,
      //     payment_method,
      //     total,
      //     total_product: order_details.length,
      //     // product_name: order.dataValues.products.dataValues.name,
      //     // product_price: order.dataValues.products.dataValues.price,
      //     name,
      //     email,
      //     phone,
      //     province,
      //     city,
      //     address,
      //     courier,
      //     services,
      //     shipping_cost,
      //     receipt_number,
      //   }).border = {
      //     bottom: { style: 'double', color: { argb: 'FF00FF00' } },
      //   };
      // }

      sheet.addRow({
        id,
        status,
        payment_method,
        total,
        total_product: order_details.length,
        name,
        email,
        createdAt,
        updatedAt,
        phone,
        province,
        city,
        address,
        courier,
        services,
        shipping_cost,
        receipt_number,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment;filename=' + 'orders.xlsx',
    );

    workbook.xlsx.write(res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { excelRouter };
