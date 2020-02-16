const express = require('express');
const mongoose = require('mongoose');
const driverRoutes = require('./routes/driverRoutes');
const app = express();

mongoose.Promise = global.Promise;

//if not in test environment, connect to the taxistop db
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/taxistop', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/drivers', driverRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(422).send({
        error: err.message
    });

});

module.exports = app;