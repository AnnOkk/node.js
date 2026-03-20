import Student from "../model/student.js";

export function createStudent(student) {
    return Student.create(student);
}

export function findStudentById(id) {
    return Student.findById(id).exec();
}

export function deleteStudentById(id) {
    return Student.findByIdAndDelete(id).exec();
}

export function updateStudent(id, data){
    return Student.findByIdAndUpdate(id, data, {new: true}).exec();
}

export function updateStudentScore(id, exam, score){
    return Student.findByIdAndUpdate(id, {$set: {[`scores.${exam}`]: score}}).exec();
}

export function findStudentsByName(name) {
    return Student.find({name: new RegExp(`^${name}$`, 'i')}).exec();
}

export function countStudentsByName(names) {
    const regexConditions = names.map(name => ({
        name: new RegExp(`^${name}$`, 'i')
    }));
    return Student.countDocuments({$or: regexConditions});
}

export function findStudentsMinScore(exam, minScore) {
    return Student.find({[`scores.${exam}`]: {$gte: minScore}}).exec();
}