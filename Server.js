const express = require('express');
const axios = require('axios'); // Use axios instead of request

const cors = require('cors')

const app = express();
app.use(cors());

// Logger middleware
app.use((req, res, next) => {
    console.log('New request made');
    console.log('Path:', req.path);
    console.log('Host:', req.hostname);
    console.log('Method:', req.method);
    next();
});

// API endpoint to get driver details
app.get('/dashboard-usa', async (req, res, next) => {
    const country = "USA";
    try {
        const response = await axios.get(`https://us-central1-projectexperiment-420611.cloudfunctions.net/assignApi?countryName=USA`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/dashboard-ind', async (req, res, next) => {
    const country = "IND";
    try {
        const response = await axios.get(`https://us-central1-projectexperiment-420611.cloudfunctions.net/assignApi?countryName=${country}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
