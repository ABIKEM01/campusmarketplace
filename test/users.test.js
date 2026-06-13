const request = require('supertest');

// Test the live Render site by default.
// To test a local server instead, run the app and change this to 'http://localhost:8080'.
const BASE_URL = 'https://campusmarketplace-q8dc.onrender.com';

// The free Render site can be slow to wake up, so allow more time.
jest.setTimeout(60000);

describe('Users GET routes', () => {
    test('GET /users returns 200 and a list', async () => {
        const res = await request(BASE_URL).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /users/:id returns 200 for a single user', async () => {
        const list = await request(BASE_URL).get('/users');
        if (list.body.length === 0) {
            // No users in the database, so there is nothing to get by id.
            return;
        }
        const id = list.body[0]._id;
        const res = await request(BASE_URL).get('/users/' + id);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
    });
});