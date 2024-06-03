const express = require('express');
const axios = require('axios');

// Configuration
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = '7d2c5c0bc843a92fdd2754f75938fbda';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const shipmentRouter = new express.Router();

shipmentRouter.get('/province', async (req, res, next) => {
  try {
    const data = await axios.get('/province');

    res.json(data.data);
  } catch (error) {
    console.log(error);
  }
});

shipmentRouter.get('/city', async (req, res, next) => {
  try {
    const province = req.query.province;

    const data = await axios.get(`/city/?province=${province}`);

    res.json(data.data);
  } catch (error) {
    console.log(error);
  }
});

shipmentRouter.get('/cost', async (req, res, next) => {
  try {
    const { origin, destination, weight, courier } = req.query;

    const data = await axios.post('/cost', {
      origin: 152,
      destination,
      weight,
      courier,
    });

    res.json(data.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { shipmentRouter };
