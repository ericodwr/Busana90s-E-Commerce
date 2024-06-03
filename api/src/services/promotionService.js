const { v4 } = require('uuid');
const { ResponseError } = require('../error/response-error.js');
const emailjs = require('@emailjs/nodejs');

const { Promotion, Customer } = require('../db/models/index.js');

const create = async (body) => {
  const { title, description, adminId, subject } = body;

  let promotion;

  await Promotion.build({
    id: v4(),
    title,
    description,
    adminId,
    subject,
  })
    .save()
    .then((result) => {
      promotion = result;
    })
    .catch((err) => console.log(err));

  // send email

  return {
    data: promotion,
    message: 'Promotion create successfully!',
  };
};

const remove = async (id) => {
  const promotion = await Promotion.findByPk(id);

  if (!promotion) throw new ResponseError(404, 'Promotion not found!');

  await promotion.destroy();

  return { message: 'Delete Promotion Successfully!' };
};

const getAll = async () => {
  const promotions = await Promotion.findAll();

  return promotions;
};

const sendToCustomer = async (req) => {
  const { subject, title, message } = req;

  emailjs.init({
    publicKey: 'V28ySbd23WNINhwdg',
    privateKey: 'wqnUvDyLKWNtzSxJ3487Q',
  });

  const email = await Customer.findAll({ attributes: ['email', 'name'] });

  const filteredEmail = [];
  const dataEmail = [];

  email.map((i) => {
    const data = {
      subject,
      title,
      message,
      email: i.email,
      name: i.name,
    };
    dataEmail.push(data);
  });

  const uniqueElementsBy = (arr, fn) =>
    arr.reduce((acc, v) => {
      if (!acc.some((x) => fn(v, x))) acc.push(v);
      return acc;
    }, []);

  const emailComparator = (a, b) => a.email == b.email;

  const filteredData = uniqueElementsBy(dataEmail, emailComparator);

  // looping send email
  for (let i = 0; i < filteredData.length; i++) {
    await emailjs.send('service_5k8ddgt', 'template_gu8uw3b', filteredData[i]);
  }
  return { message: 'Email send successfully!', email: filteredEmail };
};

module.exports = { create, getAll, remove, sendToCustomer };
