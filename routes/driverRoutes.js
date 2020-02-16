'use strict';
const router = require('express').Router();
const driversCtrl = require('../controllers/driversController');

module.exports = (function () {
    //greeting route
    router.get('/greeting', driversCtrl.greeting);
    //find all drivers
    router.get('/', driversCtrl.index);
    //create a new driver
    router.post('/', driversCtrl.create);
    //update an existing driver
    router.put('/:id', driversCtrl.edit);
    //delete an existing driver
    router.delete('/:id', driversCtrl.delete);

    return router;
}())