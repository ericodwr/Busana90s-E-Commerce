const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { adminRouter } = require('./src/routes/admin-api.js');
const { shipmentRouter } = require('./src/routes/shipment-api.js');
const { publicRouter } = require('./src/routes/public-api.js');
const { excelRouter } = require('./src/routes/excel-api.js');

const { sequalizeConnection } = require('./src/config/dbConnect.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use(publicRouter);
app.use(shipmentRouter);
app.use(excelRouter);
app.use(adminRouter);

app.listen(PORT, async () => {
  try {
    await sequalizeConnection.authenticate();
    console.log('Connection has been established successfully!');
    console.log(`App start running at port ${PORT}`);
  } catch (error) {
    console.log('Unable to connect to the database', error);
  }
});
