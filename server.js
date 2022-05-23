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

const taskSchema = new mongoose.Schema({
    id: String,
    description: String,
    faite: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World\n");
});

app.get('/:id', (req, res) => {
    res.send(req.params.id);
});

app.post('/', (req, res) => {
    res.send(req.body);
});
app.put('/', (req, res) => {
    res.send('ici traiter PUT')
})

app.delete('/', (req, res) => {
    res.send('ici traiter DELETE')
})




app.listen(3000);