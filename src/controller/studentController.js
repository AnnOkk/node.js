import * as repo from '../repository/studentRepository.js';

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const student = repo.deleteStudent(+req.params.id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const updateStudent = (req, res) => {
    const student = repo.updateStudent(+req.params.id, req.body);
    if (student) {
        const {scores, ...studentWithoutScores} = student;
        res.json(studentWithoutScores);
    } else {
        res.status(404).send();
    }
}