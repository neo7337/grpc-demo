const express = require('express');
const apiController = require('../controllers/api');

const router = express.Router();

const setRoutes = (app) => {
    router.get('/fetch-data', apiController.fetchData);
    router.post('/send-data', apiController.sendData);

    app.use('/api', router);
};

module.exports = setRoutes;