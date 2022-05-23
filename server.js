const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World\n");
});




app.listen(3000);