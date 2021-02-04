import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import {expect} from 'chai';
const TOKEN = 'ba8164f924992382db00d039a06ac3f107f2203f879086c03d6ba456036b825d';

describe('Users', () => {
    it('get/users', () => {
        return request.get(`users?access-token=${TOKEN}`)
        .then((res) => {
            expect(res.body.data).not.to.be.empty;
        });
    });

    it('get/users/120', () => {
        const url = `users/8?access-token=${TOKEN}`;
        return request.get(url).then((res) => {
            expect(res.body.data.id).to.be.eq(8);
        });
    });

    it('get/users with query parameters', () => {
        const url = `users?access-token=${TOKEN}&page=4&gender=female&status=active`
        return request.get(url).then((res) => {
            expect(res.body.data).not.to.be.null;
            res.body.data.forEach(data => {
                expect(data.gender).to.be.eq('Female')
                expect(data.status).to.be.eq('Active')
            })
        });
    });

    it('POST/users', () => {
        const data = {
            email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
            name: 'Test name',
            gender: 'Male',
            status: 'Active',
        };

        return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body.data).to.deep.include(data);
        })
    });

    it('PUT /users/:id', () => {
        const data = {
            status: "Active",
            name: `Luffy  - ${Math.floor(Math.random() * 9999)}`
        }
        return request
        .put('users/132')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body.data).to.deep.include(data);
        })
    });


    it('DELETE /users/:id', () => {
        return request
        .delete('/users/125')
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
            expect(res.body.data).to.eq(null);
        })
    });
});