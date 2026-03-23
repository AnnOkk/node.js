import express from 'express';
import studentRouter from '../../routes/studentRoutes.js';

export function createTestApp() {
    const app = express();
    app.use(express.json());
    app.use(studentRouter);
    return app;
}
