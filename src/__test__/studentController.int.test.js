import request from 'supertest';
import {beforeAll, beforeEach, afterAll, describe, expect, test} from '@jest/globals';
import Student from '../model/student.js';
import {createTestApp} from './helpers/testApp.js';
import {clearTestDb, connectTestDb, disconnectTestDb} from './helpers/testDb.js';

const app = createTestApp();

describe('Student Controller Integration (HTTP)', () => {
    beforeAll(async () => {
        await connectTestDb();
    });

    beforeEach(async () => {
        await clearTestDb();
    });

    afterAll(async () => {
        await disconnectTestDb();
    });

    describe('POST /student', () => {
        test('204 при успешном создании', async () => {
            const response = await request(app)
                .post('/student')
                .send({id: 1001, name: 'Peter', password: 'qwerty'});

            expect(response.status).toBe(204);

            const created = await Student.findById(1001).lean().exec();
            expect(created).toMatchObject({
                _id: 1001,
                name: 'Peter',
                password: 'qwerty'
            });
        });

        test('400 при невалидном body', async () => {
            const response = await request(app)
                .post('/student')
                .send({id: 1002, name: 'Peter'});

            expect(response.status).toBe(400);
            expect(response.text).toContain('"password" is required');
        });

        test('409 при создании дубликата', async () => {
            await request(app)
                .post('/student')
                .send({id: 1003, name: 'Bob', password: 'pass'});

            const duplicate = await request(app)
                .post('/student')
                .send({id: 1003, name: 'Bob', password: 'pass'});

            expect(duplicate.status).toBe(409);
        });
    });

    describe('GET /student/:id', () => {
        test('200 и JSON студента', async () => {
            await Student.create({_id: 2001, name: 'Alice', password: 'secret', scores: {math: 90}});

            const response = await request(app).get('/student/2001');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                _id: 2001,
                name: 'Alice',
                password: 'secret',
                scores: {math: 90}
            });
        });

        test('404 если не найден', async () => {
            const response = await request(app).get('/student/2999');
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /student/:id', () => {
        test('200 и JSON удаленного студента', async () => {
            await Student.create({_id: 3001, name: 'Nina', password: 'pwd', scores: {java: 88}});

            const response = await request(app).delete('/student/3001');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                _id: 3001,
                name: 'Nina',
                password: 'pwd',
                scores: {java: 88}
            });
        });

        test('404 если не найден', async () => {
            const response = await request(app).delete('/student/3999');
            expect(response.status).toBe(404);
        });
    });

    describe('PATCH /student/:id', () => {
        test('500 и JSON ошибки при обновлении существующего студента (текущее поведение)', async () => {
            await Student.create({_id: 4001, name: 'Mark', password: 'oldpass', scores: {node: 77}});

            const response = await request(app)
                .patch('/student/4001')
                .send({name: 'Marcus'});

            expect(response.status).toBe(500);
        });

        test('400 при невалидном body', async () => {
            await Student.create({_id: 4002, name: 'Kate', password: 'pwd'});

            const response = await request(app)
                .patch('/student/4002')
                .send({name: 12345});

            expect(response.status).toBe(400);
            expect(response.text).toContain('"name" must be a string');
        });

        test('500 если студент не найден (текущее поведение)', async () => {
            const response = await request(app)
                .patch('/student/4999')
                .send({name: 'Ghost'});

            expect(response.status).toBe(500);
        });
    });

    describe('PATCH /score/student/:id', () => {
        test('204 при успехе', async () => {
            await Student.create({_id: 5001, name: 'Lena', password: 'pwd'});

            const response = await request(app)
                .patch('/score/student/5001')
                .send({examName: 'math', score: 95});

            expect(response.status).toBe(204);

            const updated = await Student.findById(5001).lean().exec();
            expect(updated.scores).toEqual({math: 95});
        });

        test('400 при невалидном body', async () => {
            await Student.create({_id: 5002, name: 'Tom', password: 'pwd'});

            const response = await request(app)
                .patch('/score/student/5002')
                .send({examName: 'math', score: 101});

            expect(response.status).toBe(400);
            expect(response.text).toContain('"score" must be less than or equal to 100');
        });

        test('404 если студент не найден', async () => {
            const response = await request(app)
                .patch('/score/student/5999')
                .send({examName: 'math', score: 50});

            expect(response.status).toBe(404);
        });
    });

    describe('GET /students/name/:name', () => {
        test('200 и массив студентов', async () => {
            await Student.create([
                {_id: 6001, name: 'Peter', password: 'p1', scores: {math: 80}},
                {_id: 6002, name: 'peter', password: 'p2', scores: {math: 70}},
                {_id: 6003, name: 'Bob', password: 'p3', scores: {math: 60}}
            ]);

            const response = await request(app).get('/students/name/Peter');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body).toEqual(expect.arrayContaining([
                {_id: 6001, name: 'Peter', password: 'p1', scores: {math: 80}},
                {_id: 6002, name: 'peter', password: 'p2', scores: {math: 70}}
            ]));
        });
    });

    describe('GET /quantity/students?names=Peter&names=Bob', () => {
        test('200 и число', async () => {
            await Student.create([
                {_id: 7001, name: 'Peter', password: 'p1'},
                {_id: 7002, name: 'bob', password: 'p2'},
                {_id: 7003, name: 'Alice', password: 'p3'}
            ]);

            const response = await request(app).get('/quantity/students?names=Peter&names=Bob');

            expect(response.status).toBe(200);
            expect(response.body).toBe(2);
        });
    });

    describe('GET /students/exam/:exam/minscore/:minScore', () => {
        test('200 и массив студентов', async () => {
            await Student.create([
                {_id: 8001, name: 'A', password: 'p', scores: {math: 90}},
                {_id: 8002, name: 'B', password: 'p', scores: {math: 75}},
                {_id: 8003, name: 'C', password: 'p', scores: {math: 60}}
            ]);

            const response = await request(app).get('/students/exam/math/minscore/70');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body).toEqual(expect.arrayContaining([
                {_id: 8001, name: 'A', password: 'p', scores: {math: 90}},
                {_id: 8002, name: 'B', password: 'p', scores: {math: 75}}
            ]));
        });
    });
});
