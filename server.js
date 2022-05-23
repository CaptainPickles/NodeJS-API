const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NodeJsMongo')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log("Not connected to database", err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World\n");
});




app.listen(3000);