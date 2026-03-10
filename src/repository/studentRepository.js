import {Student} from "../model/student.js";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = (id) =>  students.get(id);


export const deleteStudent = (id) => {
   const student = students.get(id);
   if (student) {
       students.delete(id);
       return student;
   }
}

export const updateStudent = (id, data) => {
    const student = students.get(id);
    if (student) {
        // students.set(id, {...student, ...data});
        // return students.get(id);
        Object.assign(student, data);
        return student;
    }
}

export const addScore = (id, exam, score) => {
    // TODO: Implement score addition logic
}

export const findByName = (name) => {
    // TODO: Implement student retrieval by name logic
}

export const countByNames = (names) => {
    // TODO: Implement student count by names logic
}

export const findByMinScore = (exam, minScore) => {
    // TODO: Implement student retrieval by minimum score logic
}