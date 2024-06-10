const { v4 } = require('uuid');
const { ResponseError } = require('../error/response-error.js');
const emailjs = require('@emailjs/nodejs');

const { Broadcast, Customer } = require('../db/models/index.js');

const {
  EMAILJS_PRIVATE_KEY,
  EMAILJS_PUBLIC_KEY,
} = require('../utils/constant.js');

const create = async (body) => {
  const { title, description, adminId, subject } = body;

  let broadcast;

  await Broadcast.build({
    id: v4(),
    title,
    description,
    adminId,
    subject,
  })
    .save()
    .then((result) => {
      broadcast = result;
    })
    .catch((err) => console.log(err));

  return {
    data: broadcast,
    message: 'Broadcast create successfully!',
  };
};

const remove = async (id) => {
  const broadcast = await Broadcast.findByPk(id);

  if (!broadcast) throw new ResponseError(404, 'broadcast not found!');

  await broadcast.destroy();

  return { message: 'Delete Broadcast Successfully!' };
};

const getAll = async () => {
  const broadcasts = await Broadcast.findAll();
  return broadcasts;
};

const sendToCustomer = async (req) => {
  const { subject, title, message } = req;

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
    privateKey: EMAILJS_PRIVATE_KEY,
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
