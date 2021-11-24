const app = require('../server');
const supertest = require('supertest');

test('POST /v1/user-bills/count-bill', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    await supertest(app)
    .post('/v1/user-bills/count-bill')
    .set('Authorization', 'Bearer ' + token.body.token)
    .expect(200)
    .then((res) => {
        expect(res.body.status).toBe('success');
    });
});

test('DELETE /v1/tax-object/delete-all', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    await supertest(app)
        .delete('/v1/tax-object/delete-all')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});
