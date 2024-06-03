const bycrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { Admin } = require('../db/models/index.js');

const { ResponseError } = require('../error/response-error.js');

const register = async (request) => {
  const { username, password, email } = request;

  const hashPassword = await bycrypt.hash(password, 10);

  let newAdmin;

  await Admin.build({
    id: v4(),
    username,
    password: hashPassword,
    email,
  })
    .save()
    .then((res) => {
      newAdmin = res;
    })
    .catch((err) => console.log(err));

  console.log(newAdmin.id);

  return {
    data: newAdmin,
    message: 'success create admin',
  };
};

const login = async (req) => {
  const { username, password } = req;
  const user = await Admin.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'username or password is wrong!');
  }

  const isPasswordValid = await bycrypt.compare(
    password,
    user.dataValues.password,
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, 'username or password is wrong!');
  }

  const token = jwt.sign({ username, role: 'admin' }, 'sendbylovsecret', {
    expiresIn: '24hr',
  });

  const data = await user.update(
    {
      token,
    },
    {
      where: {
        username: user.dataValues.username,
      },
    },
    {
      attributes: ['id', 'token', 'username', 'email'],
    },
  );

  return {
    id: data.id,
    token: data.token,
    username: data.username,
    email: data.email,
  };
};

const get = async (username) => {
  const admin = await Admin.findOne({
    where: {
      username,
    },
    include: 'categories',
  });

  if (!admin) {
    throw new ResponseError(404, 'admin not found!');
  }

  return admin;
};

module.exports = { register, login, get };
