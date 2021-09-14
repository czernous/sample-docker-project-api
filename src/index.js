const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { PORT, HOST, db, authApiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');

const app = express();

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });
silence.save((err, result) => {
    if (err) return console.log(err);
    console.log('result with volumes', result);
})

app.get('/test', (req, res) => {
    res.send('API works!');
});

app.get('/testapidata', (req, res) => {
    res.json({
        testapidata: true,
    })
})

app.get('/testcurruser', (req, res) => {
    axios.get(authApiUrl + '/currentUser')
        .then(response => {
            res.json({
                testcurruser: true,
                currentUserApiData: response.data,
            })
        })
        .catch(e => console.log(e));
});

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`The server is running on ${HOST}:${PORT}`);
        console.log(`The host is ${HOST}`);
        console.log(`Database URL is ${db}`)
    });
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);


