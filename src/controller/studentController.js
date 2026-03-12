import * as repo from '../repository/studentRepository.js'

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id); //!!!!последний параметр указываем согласно Rout!
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const student = repo.deleteStudent(+req.params.id); //!!!!последний параметр указываем согласно Rout!
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

export const addScore = (req, res) => {
    const {examName, score} = req.body;
    const success = repo.addScore(+req.params.id, examName, score);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
}
export const findByName = (req, res) => {
    //console.log("REQ PARAMS:", req.params);  // посмотри, что реально приходит


    const student = repo.findByName(req.params.name);

    if (student.length>0) {
        const studentsWithoutPasswords = student.map(({password, ...rest}) => rest)
        res.json(studentsWithoutPasswords);
    } else {
        res.status(404).send();
    }
}

export const countByNames = (req, res) => {
    let names = req.query.names;
    if(!Array.isArray(names)) {
        names = [names];
    }
    const count = repo.countByNames(names);
    res.json(count);

}

export const findByMinScore = (req, res) => {
    console.log("REQ PARAMS:", req.params);

    const {exam,minScore} = req.params;

    console.log("Looking for exam:", exam, "minScore:", minScore);

    const students = repo.findByMinScore(exam,+minScore);
    console.log("Found students:", students);


    if (students.length > 0) {
        const studentsWithoutPasswords =
            students.map(({password, ...rest}) => rest);
        res.json(studentsWithoutPasswords);
    } else {
        res.status(404).send();
    }
}