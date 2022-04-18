const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/music', (req, res) => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    res.json(CLIENT_ID);
})

app.listen(8000, () => console.log(`Server is running on ${PORT}`));