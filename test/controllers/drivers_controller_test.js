const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('POST to /api/drivers creates a new driver', done => {

        Driver.countDocuments().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({
                    email: 'john@test.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    userName: 'j_doe101'
                })
                .end(() => {
                    Driver.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });

                });
        });

    });

    it('PUT to /api/drivers/id edits an existing driver', done => {
        const driver = new Driver({
            email: 'jane@test.com',
            firstName: 'Jane',
            lastName: 'Doe',
            userName: 'jane_101',
            driving: false
        });
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({
                    driving: true
                })
                .end(() => {
                    Driver.findOne({
                            email: 'jane@test.com'
                        })
                        .then(driver => {
                            assert(driver.driving === true)
                            done();
                        })
                })
        })
    });

    it('DELETE to /api/drivers/id deletes an existing driver', done => {
        const driver = new Driver({
            email: 'jack@test.com',
            firstName: 'Jack',
            lastName: 'Burr',
            userName: 'jack_102'
        });
        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({
                            email: 'jack@test.com'
                        })
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        })
                });

        });
    });

    it('GET to /api/drivers/ finds drivers in a location', done => {
        const seattleDriver = new Driver({
            email: 'seattle_driver@test.com',
            firstName: 'Jake',
            lastName: 'Dale',
            userName: 'jd_101',
            geometry: {
                type: 'Point',
                coordinates: [-122.335167, 47.608013]
            }
        });

        const miamiDriver = new Driver({
            email: 'miami_driver@test.com',
            firstName: 'David',
            lastName: 'Baker',
            userName: 'dave_b',
            geometry: {
                type: 'Point',
                coordinates: [-80.179100, 25.778135]
            }
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=26')
                    .end((err, response) => {
                        assert(response.body.length === 1);
                        assert(response.body[0].email === 'miami_driver@test.com');
                        done();
                    })
            })
    });
});