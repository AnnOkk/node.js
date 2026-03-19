import * as repo from "../repository/studentRepository.js";


export const addStudent = async ({id, name, password}) => {
    if(await repo.findStudentById(id)){
        return false
    }
    await repo.createStudent({_id:id, name, password});

return true
}

export const findStudent = async (id) => {
const student = await repo.findStudentById(id);

if(!student){
    return false
}
return renameId(student);
}


export const deleteStudent = async (id) => {
const student = await repo.deleteStudentById(id);
if(student){
    return renameId(student);
}else return false;
}

export const updateStudent = async (id, data) => {
    if (Object.keys(data).length === 0) {
        const student = await repo.findStudentById(id);
        if (!student) return false;
        return renameId(student);
    }

    const student = await repo.updateStudent( id, data);
if(!student) return false;
return renameId(student);

}

export const addScore = async (id, exam, score) => {
    console.log("INPUT:", id, exam, score);
const student = await repo.updateStudentScore(id,exam, score);
    console.log("RESULT:", student);
if(!student) return false;
return renameId(student);
}

export const findByName = async (name) => {
    const student = await repo.findStudentsByName(name)
    if (student) {
        return student
    } else return false;
}
export const countByNames = async (names) => {
   return  repo.countStudentsByName(names);
}

export const findByMinScore = async (exam, minScore) => {
const students = await repo.findStudentsByMinScore(exam, minScore);
return students.map(renameId);
}

function renameId(student) {
    if (!student) {
        return student;
    }
    const obj = student.toObject
        ? student.toObject() //
        : student;
    delete obj.password;
    obj.id = obj._id;
    delete obj._id

    if(obj.scores instanceof Map){
        obj.scores = Object.fromEntries(obj.scores) //!!!!!!!!!!!!!!!*****nnuj map
    }


    return obj;
}