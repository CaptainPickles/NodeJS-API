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

app.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(400).send('id not correct format')
    const task = await Task.findById(req.params.id)
    if (!task) res.status(401).send("task not found");

    res.send(task);
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
app.put('/', async (req, res) => {
    res.send('ici traiter PUT')
})

app.delete('/', async (req, res) => {
    const id = req.body.id
    if (!id) res.status(400).send('id  no set in body')
    if (!mongoose.Types.ObjectId.isValid(String(id))) res.status(400).send('id not correct format')

    const deletedTask = await Task.deleteOne({ _id: String(id) });
    res.send(deletedTask)
})


app.listen(3000);