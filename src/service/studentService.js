import * as repo from "../repository/studentRepository.js";


export const addStudent = async ({id, name, password}) => {
    if(await repo.findStudentById(id)){
        return false
    }
    await repo.createStudent({_id:id, name, password});

return true
}

export const findStudent = async (id) => {
//todo
//
}


export const deleteStudent = async (id) => {
//todo
}

export const updateStudent = async (id, data) => {
    //todo
}

export const addScore = async (id, exam, score) => {
//todo
}

export const findByName = async (name) => {
//todo
}

export const countByNames = async (names) => {
   //todo
}

export const findByMinScore = async (exam, minScore) => {
//todo
}

function renameId(student) {
    if (student) {
        student.id = student._id;
        delete student._id;
    }
    return student;
}