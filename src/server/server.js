const app = require('express')();
const express = require('express');
const bodyparser = require('body-parser');

app.use(express.json());

app.use(bodyparser.json({ limit: '256kb' }));
const port = 8080;
app.listen(port, () => console.log('WM Ops Plan app listening on port ', port));
