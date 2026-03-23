import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Student from '../../model/student.js';

let mongoServer;

export async function connectTestDb() {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {dbName: 'jest'});
}

export async function clearTestDb() {
    await Student.deleteMany({});
}

export async function disconnectTestDb() {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
}
