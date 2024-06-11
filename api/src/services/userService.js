const bycrypt = require('bcryptjs');
const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { User } = require('../db/models/index.js');

const { ResponseError } = require('../error/response-error.js');

const register = async (request) => {
  const { username, password, email } = request;

  const hashPassword = await bycrypt.hash(password, 10);

  let newUser;

  User.build({
    id: v4(),
    username,
    password: hashPassword,
    email,
  })
    .save()
    .then((res) => {
      newUser = res;
    })
    .catch((err) => console.log(err));

  return {
    data: newUser,
    message: 'success create user',
  };
};

const login = async (req) => {
  const { username, password } = req;
  const user = await User.findOne({
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

  const token = jwt.sign({ username, role: 'admin' }, 'busana90s', {
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
  const admin = await User.findOne({
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
