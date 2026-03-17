import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentRouter from "./routes/studentRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(studentRouter)

app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('404 Not Found')
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log("Connected to MongoDB");
        app.listen(port, () => console.log(`Server running on port ${port}. Press Ctrl+C to quit.`));
    } catch (e) {
        console.log('Failed connecting to MongoDB: ', e);
    }
}

startServer();

