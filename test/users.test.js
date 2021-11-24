const app = require('../server');
const supertest = require('supertest');

test('POST /v1/users/signup', async () => {
    const data = {
        username: 'johdoe19',
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    }

    await supertest(app)
    .post('/v1/admins/log-in')
    .send(data)
    .expect(200)
    .then((res) => {
        expect(res.body.status).toBe('success');
    });
});

test('POST /v1/users/signin', async () => {
    const token = {
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    }

    await supertest(app)
    .post('/v1/admins/log-in')
    .send(token)
    .expect(200)
    .then((res) => {
        expect(res.body.status).toBe('success');
    });
});

test('DELETE /v1/users/delete-account', async () => {
    const data = {
        username: 'Fariz',
        email: 'testbaru23@gmail.com',
        password: 'testbaru23',
    };

    const user = await supertest(app).post('/v1/users/signup').send(data);

    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'testbaru23@gmail.com',
        password: 'testbaru23',
    });

    await supertest(app)
        .delete('/v1/users/delete-account')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success');
        });
});
