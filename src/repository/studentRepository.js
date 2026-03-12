//пишем функции согласно API/ this is service+repository

import {Student} from "../model/student.js";

const students = new Map(); //где мы храним студентов


export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = (id) =>
    students.get(id);


export const deleteStudent = (id) => {
    const student = students.get(id); //находим студента
    if (student) {
        students.delete(id);
        return student;
    }
}

export const updateStudent = (id, data) => {
    const student = students.get(id);
    if (student) {
        // students.set(id,{...student, ...data});
        // return students.get(id);
        Object.assign(student, data);
        return student;
    }
}

export const addScore = (id, exam, score) => {
    const student = students.get(id);
    if (student) {
        student.scores[exam] = score;
        return true;
    } else return false;
}

export const findByName = (name) => {
const result = []
    const normName = name.toLowerCase();
    for (const student of students.values()) {
        if (student.name.trim().toLowerCase() === normName) {
            result.push(student);
        }
    }
    return result;
}

export const countByNames = (names) => {
    let count = 0;
    const normalizedNames = names.map(n => n.trim().toLowerCase());
    for(const student of students.values()){
        const studentName = student.name.trim().toLowerCase();

        if(normalizedNames.includes(studentName)){
            count++;
        }
    }
    return count;

}


export const findByMinScore = (exam, minScore) => {
    const result = [];
    const normalizedExam=exam.trim().toLowerCase();
    for (const student of students.values()) {
        for (const [studentExam, score] of Object.entries(student.scores)) {
            if (studentExam.trim().toLowerCase() === normalizedExam && score >= minScore) {
                result.push(student);
                break; // нашли подходящий экзамен, больше проверять не нужно
            }
        }
    }
    return result;
}
