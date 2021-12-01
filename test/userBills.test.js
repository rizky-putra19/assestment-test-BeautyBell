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

test('DELETE /v1/user-bills/delete-all', async () => {
    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'johndoe19@gmail.com',
        password: 'testingtest2',
    });

    await supertest(app)
        .delete('/v1/user-bills/delete-all')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.status).toBe('success')
        });
});

test('POST /v1/user-bills/count-bill', async () => {
    const data = {
        username: 'test-logic',
        email: 'testlogic@gmail.com',
        password: 'testlogic',
    };

    await supertest(app).post('/v1/users/signup').send(data);

    const token = await supertest(app).post('/v1/users/signin').send({
        email: 'testlogic@gmail.com',
        password: 'testlogic',
    });

    const dataTax1 = {
        name: 'test logic1',
        taxCode: 1,
        price: 5000,
    }

    const dataTax2 = {
        name: 'test logic2',
        taxCode: 2,
        price: 6500,
    }

    const dataTax3 = {
        name: 'test logic3',
        taxCode: 3,
        price: 2500,
    }

    const dataTax4 = {
        name: 'test logic4',
        taxCode: 3,
        price: 95,
    }

    await supertest(app)
        .post('/v1/tax-object/create-object')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(dataTax1);

    await supertest(app)
        .post('/v1/tax-object/create-object')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(dataTax2);

    await supertest(app)
        .post('/v1/tax-object/create-object')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(dataTax3);

    await supertest(app)
        .post('/v1/tax-object/create-object')
        .set('Authorization', 'Bearer ' + token.body.token)
        .send(dataTax4);

    await supertest(app)
        .post('/v1/user-bills/count-bill')
        .set('Authorization', 'Bearer ' + token.body.token)
        .expect(200)
        .then((res) => {
            expect(res.body.data.userBills[0].subTotal).toBe(14095);
            expect(res.body.data.userBills[0].taxSubTotal).toBe(759);
            expect(res.body.data.userBills[0].grandTotal).toBe(14854);
        });
})
