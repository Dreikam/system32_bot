import request from 'supertest'
import app from '../src/app'

describe('GET /api/guilds', () => {
    it('responds with a json message for guild', (done) => {
        request(app)
            .get('/api/guilds/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                "id": "3",
                "name": "Dreikam2"
              }, done)
    })
})