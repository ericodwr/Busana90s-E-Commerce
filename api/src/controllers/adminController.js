const adminService = require('../services/adminService');

const register = async (req, res, next) => {
  try {
    const result = await adminService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { username } = req.query;
    const result = await adminService.get(username);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, get };
