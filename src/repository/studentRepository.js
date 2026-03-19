import StudentModel from '../model/student';
import Student from "../model/student";


export function createStudent(student) {
    return Student.create(student);
}

export function findStudentById(id){
    return Student.findById(id);
}

export function deleteStudentById(id) {
    return Student.findByIdAndDelete(id);
}

export function updateStudent(id,data) {
    return Student.findByIdAndUpdate(id,data)
}

export function updateStudentScore(id,exam,score) {
    return Student.findByIdAndUpdate(id,{$set:{[`scores.$[exam]`]:score}});
}

export function findStudentsByName(name) {
    return Student.find({name: new RegExp(`^${name}$`,'i')});
}

export function countStudentsByName(name) {
    const regexConditions = names.map(name=> ({
        name: new RegExp(`^${name}$`,'i')
    }))
    return Student.countDocuments({$or:regexConditions});
}
export function findStudentsByMinScore(exam, minScore) {
    return Student.find({[`scores.${exam}`]:{$gte:minScore}})
}



// export const addStudent = async ({id, name, password}) => {
//     const existingStudent = await collection.findOne({_id: id});
//     if (existingStudent) {
//         return false;
//     }
//     await collection.insertOne({_id: id, name, password, scores: {}});
//     return true;
// }
//
// export const findStudent = async (id) => {
//     return renameId(await collection.findOne({_id: id}));
// }
//
//
// export const deleteStudent = async (id) => {
//     return renameId(await collection.findOneAndDelete({_id: id}));
// }
//
// export const updateStudent = async (id, data) => {
//     return renameId(await collection.findOneAndUpdate(
//             {_id: id},
//             {$set: data},
//             {returnDocument: 'after'}
//         )
//     );
// }
//
// export const addScore = async (id, exam, score) => {
//     return renameId(await collection.findOneAndUpdate(
//             {_id: id},
//             {$set: {[`scores.${exam}`]: score}},
//             {returnDocument: 'after'}
//         )
//     );
// }
//
// export const findByName = async (name) => {
//     return (await collection.find({name: {$regex: `^${name}$`, $options: 'i'}}).toArray()).map(renameId);
// }
//
// export const countByNames = async (names) => {
//     const regexConditions = names.map(name => ({
//         name: {$regex: `^${name}$`, $options: 'i'}
//     }));
//     return await collection.countDocuments({$or: regexConditions});
// }
//
// export const findByMinScore = async (exam, minScore) => {
//     return (await collection.find({[`scores.${exam}`]: {$gte: minScore}}).toArray()).map(renameId);
// }
//
// function renameId(student) {
//     if (student) {
//         student.id = student._id;
//         delete student._id;
//     }
//     return student;
// }