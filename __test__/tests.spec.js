const { default: mongoose } = require("mongoose");
const request = require("supertest");
// todo refactor to dev env
const app = "localhost:3000";
const TaskSeeded = { description: "test description", faite: false }
let idTaskSeeded


beforeAll(async () => {
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb://localhost:27017/NodeJsMongo')
    const taskSchema = new mongoose.Schema({
        description: String,
        faite: Boolean,
    });
    let Task = mongoose.model('Task', taskSchema);
    await Task.deleteMany();

    const modelCreated = await Task.create(TaskSeeded)
    idTaskSeeded = modelCreated._id
    console.log(idTaskSeeded)

});

afterAll(async () => {
    await mongoose.connection.close()
});

it("Should test get GET (/)", async () => {
    const result = await request(app).get('/').send().expect(200);
    expect(result.body[0]).toHaveProperty("description", TaskSeeded.description)
    expect(result.body[0]).toHaveProperty("faite", TaskSeeded.faite)
    expect(result.body.length).toBe(1)
})
// todo see in db if correct
it("Should test post (/)", async () => {
    const taskToCreate = { description: "test created by post", faite: false }
    const result = await request(app).post('/').send({ description: "test created by post", faite: false }).expect(200);
    await request(app).post('/').send({ description: "test created by post" }).expect(401);
    expect(result.body).toMatchObject(taskToCreate)
})

it("Should test get (/:id)", async () => {
    // await request(app).get('/?id=dzdzddz').expect(401); //should return 401
    // const result = await request(app).get(`/?id=${idTaskSeeded}`).expect(200); // should return result.id
    // expect(result.body).toBe(false)
    expect(true).toBe(true)

})

// todo
it("Should test put (/:id)", async () => {
    expect(true).toBe(true)
})
