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

    const result = schemaCreateTask.validate(req.body);
    if (result.error) {
        res.status(401).send({ error: result.error.details[0].message });
    }

    const createdTask = await Task.create(req.body)
    res.send(createdTask);
});
// return nbr of row updated
app.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) res.status(400).send('id  no set in params')
    if (!mongoose.Types.ObjectId.isValid(String(id))) res.status(400).send('id not correct format')
    const schemaUpdateTask = Joi.object({
        description: Joi.string().min(2).max(50).required(),
        faite: Joi.boolean().required(),
    });

    const result = schemaUpdateTask.validate(req.body);
    if (result.error) {
        res.status(500).send({ error: result.error.details[0].message });
    }

    const task = await Task.findById(req.params.id)
    if (!task) res.status(401).send("task not found");
    const resultFromDb = await Task.updateOne({ _id: req.params.id }, task)

    res.send(resultFromDb)
})

app.delete('/', async (req, res) => {
    const id = req.body.id
    if (!id) res.status(400).send('id  no set in body')
    if (!mongoose.Types.ObjectId.isValid(String(id))) res.status(400).send('id not correct format')

    const deletedTask = await Task.deleteOne({ _id: String(id) });
    res.send(deletedTask)
})


app.listen(3000);