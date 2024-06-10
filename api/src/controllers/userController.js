const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { username } = req.query;
    const result = await userService.get(username);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, get };
