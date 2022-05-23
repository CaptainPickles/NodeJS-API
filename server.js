const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NodeJsMongo')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log("Not connected to database", err));

const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    description: String,
    faite: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

app.get('/', async (req, res) => {
    const tasks = await Task.find({})
    res.send(tasks);
});

app.get('/:id', (req, res) => {
    res.send(req.params.id);
});

app.post('/', async (req, res) => {
    const schemaCreateTask = Joi.object({
        description: Joi.string().min(2).max(50).required(),
        faite: Joi.boolean().required(),
    });
    let data
    try {
        data = await schemaCreateTask.validateAsync(req.body)
    } catch (err) {
        res.status(500).send({ error: err.details[0].message });
    }
    if (!data) return

    const createdTask = await Task.create(data)
    res.send(createdTask);
});
app.put('/', (req, res) => {
    res.send('ici traiter PUT')
})

app.delete('/', (req, res) => {
    res.send('ici traiter DELETE')
})


app.listen(3000);