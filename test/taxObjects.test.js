const app = require('../server');
const supertest = require('supertest');

test('POST /v1/tax-object/create-object', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    const data = {
        name: 'chiki',
        taxCode: 1,
        price: 5000,
    }

    await supertest(app)
    .post('/v1/tax-object/create-object')
    .set('Authorization', 'Bearer ' + token.body.token)
    .send(data)
    .expect(200)
    .then((res) => {
        expect(res.body.status).toBe('success');
    });
});

test('DELETE /v1/tax-object/delete/:id', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    const data = {
        name: 'test delete',
        taxCode: 2,
        price: 5000,
    }

    const createData = await supertest(app)
        .post('/v1/tax-object/create-object')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(data);

    await supertest(app)
        .delete('/v1/tax-object/delete' + createData.body.data.id)
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});

test('DELETE /v1/tax-object/delete-all', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    await supertest(app)
        .delete('/v1/user-bills/delete-bill')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});
