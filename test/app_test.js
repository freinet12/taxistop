const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    it('handles a get request to /api/drivers/greeting', done => {
        request(app)
            .get('/api/drivers/greeting')
            .end((err, response) => {
                console.log(err)
                assert(response.body.message === 'Hello World!');
                done();
            });
    });
});