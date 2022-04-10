require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// all end points will come here
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/addnews', require('./routes/addnews'));
app.use('/api/getnews', require('./routes/getnews'));

app.listen(port, () => {
    console.log(`FactChain listening at http://localhost:${port}`);
})