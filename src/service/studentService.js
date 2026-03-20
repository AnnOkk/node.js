import * as repo from '../repository/studentRepository.js';

export const addStudent = async ({id, name, password}) => {
    if (await repo.findStudentById(id)) {
        return false;
    }
    await repo.createStudent({_id: id, name, password});
    return true;
}

export const findStudent = async (id) => {
    const student = await repo.findStudentById(id);
    if (student) {
        student.password = undefined;
    }
    return renameId(student);
}

export const deleteStudent = async (id) => {
    const student = await repo.deleteStudentById(id);
    if (student) {
        student.password = undefined;
    }
    return renameId(student);
}

export const updateStudent = async (id, data) => {
    const student = await repo.updateStudent(id, data);
    if (student) {
        student.scores = undefined;
    }
    return renameId(student);
}

export const addScore = async (id, exam, score) => await repo.updateStudentScore(id, exam, score);

export const findByName = async (name) => {
    const students = await repo.findStudentsByName(name);
    return students.map(s => {
        s.password = undefined;
        return renameId(s);
    });
}

export const countByNames = (names) => repo.countStudentsByName(names);

export const findByMinScore = async (exam, minScore) => {
    const students = await repo.findStudentsMinScore(exam, minScore);
    return students.map(s => {
        s.password = undefined;
        return renameId(s);
    });
}

function renameId(student) {
    if (student) {
        student.id = student._id;
        delete student._id;
    }
    return student;
}