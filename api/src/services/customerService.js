const { Customer } = require('../db/models/index.js');
const { v4 } = require('uuid');

const create = async (req) => {
  const { name, email, phone, address, province, city } = req;

  let customer;

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

  return {
    data: customer,
    message: 'Create customer successfully!',
  };
};

const getAll = async () => {
  // group by buat filter
  const customers = await Customer.findAll();

  return { data: customers };
};

module.exports = { create, getAll };
