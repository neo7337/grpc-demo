const axios = require('axios');

const GO_SERVICE_URL = 'http://localhost:8080'; // Adjust the URL as needed

exports.fetchData = async (req, res) => {
    try {
        const response = await axios.get(`${GO_SERVICE_URL}/api/data`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Go service', error: error.message });
    }
};

exports.sendData = async (req, res) => {
    try {
        const response = await axios.post(`${GO_SERVICE_URL}/api/data`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error sending data to Go service', error: error.message });
    }
};