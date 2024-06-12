const bannerService = require('../services/bannerService.js');

const create = async (req, res, next) => {
  try {
    req.body.img_url = req.file.path;
    const result = await bannerService.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.query.id;
    const result = await bannerService.remove(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const editStatus = async (req, res, next) => {
  try {
    const result = await bannerService.editStatus(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await bannerService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getActiveBanners = async (req, res, next) => {
  try {
    const result = await bannerService.getActiveBanner();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, remove, editStatus, getActiveBanners };
