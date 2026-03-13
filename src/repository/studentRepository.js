let collection;

export const init = db => collection = db.collection('college');

export const addStudent = async ({id, name, password}) => {
    const existingStudent = await collection.findOne({_id: id});
    if (existingStudent) {
        return false;
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
    return true;
}

export const findStudent = async (id) => {
    return renameId(await collection.findOne({_id: id}));
}


export const deleteStudent = async (id) => {
    return renameId(await collection.findOneAndDelete({_id: id}));
}

export const updateStudent = async (id, data) => {
    return renameId(await collection.findOneAndUpdate(
            {_id: id},
            {$set: data},
            {returnDocument: 'after'}
        )
    );
}

export const addScore = async (id, exam, score) => {
    return renameId(await collection.findOneAndUpdate(
            {_id: id},
            {$set: {[`scores.${exam}`]: score}},
            {returnDocument: 'after'}
        )
    );
}

export const findByName = (name) => {
    // TODO implement findByName functionality
}

export const countByNames = (names) => {
    // TODO implement countByNames functionality
}

export const findByMinScore = async (exam, minScore) => {
    return (await collection.find({[`scores.${exam}`]: {$gte: minScore}}).toArray()).map(renameId);
}

function renameId(student) {
    if (student) {
        student.id = student._id;
        delete student._id;
    }
    return student;
}