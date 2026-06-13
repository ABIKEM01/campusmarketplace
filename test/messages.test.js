const request = require('supertest');

const BASE_URL = 'https://campusmarketplace-q8dc.onrender.com';

jest.setTimeout(60000);

describe('Messages GET routes', () => {
    test('GET /messages returns 200 and a list', async () => {
        const res = await request(BASE_URL).get('/messages');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /messages/:id returns 200 for a single message', async () => {
        const list = await request(BASE_URL).get('/messages');
        if (list.body.length === 0) {
            return;
        }
        const id = list.body[0]._id;
        const res = await request(BASE_URL).get('/messages/' + id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
    });
});