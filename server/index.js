const express = require('express');
const app = express();
require("dotenv").config()
const port = process.env.PORT;
const mongoDB = require("./db");
const CreateUser = require("./Routes/CreateUser");
const Home = require("./Routes/HomeRoute")
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());

app.use('/', Home);

app.use('/api', CreateUser);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})