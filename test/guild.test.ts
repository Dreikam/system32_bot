import request from 'supertest';
import app from '../src/app';

// describe('Test API', () => {
//     test('MIrar si mi API prende', (done) => {
//         request(app)
//         .get('/')
//         .then((res) => {
//             expect(res.statusCode).toBe(200)
//             done()
//         })
//     })
// })

describe('obtener servidor', () => {
  test('recibir datos del servidor', (done) => {
    request(app)
      .get('/members/219719903488245760')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        discordId: '219719903488245760',
        name: 'dreikam',
        avatar: 'a_eb79a4c19f8904ff7cc8987844ed2019',
      });
  });
});
