const app = require('express')();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// Controller Files
const mainController = require('./controller/employeeController');

app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true })); 
app.use(bodyparser  .json());

 (function connectMongoose () {
     mongoose.connect('mongodb://localhost:27017/mvp')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));
 })()


app.get('/get_employees', (req, res) => {
    mainController.fetchAllEmployees((err, response) => {
        if(err) return res.send(err);
        res.status(200).send(response);
    });
});

app.put('/update_employee/:employee_id', (req, res) => {
    mainController.updateEmployee(req, (err, response) => {
        if(err) return res.send(err);
        res.status(204).send(response);
    });
});

const port = 8080;
app.listen(port, () => console.log('WM Ops Plan app listening on port ', port));
