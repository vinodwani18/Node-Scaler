const express = require('express')
const mongoose = require('mongoose')
const categories = require("./Routes/categories")
const students = require("./Routes/students")

const app = express();

mongoose.connect('mongodb://localhost/learningPlatform')
.then(() => console.log("connection is successfull"))
.catch(err => console.log("connection failed", err))

app.use('/api/categories', categories);
app.use('/api/students', students);
app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`Port is running on ${port}`))