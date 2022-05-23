const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NodeJsMongo')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log("Not connected to database", err));

const Joi = require('joi');

const schemaJoiTask = Joi.object({
    id: Joi.number().required(),
    description: Joi.string().min(2).max(50).required(),
    faite: Joi.boolean(),
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World\n");
});




app.listen(3000);