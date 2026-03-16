let collection;
export const init = (db) => collection = db.collection('college'); //


export const addStudent = async ({id, name, password}) => {
    const existingStudent = await collection.findOne({_id: id});
    if (existingStudent) {
        return false
    }
    await collection.insertOne({_id: id, name, password, scores: {}});
}

export const findStudent = async (id) => {
    return renameId(await collection.findOne({_id: id}));
};


export const deleteStudent = async (id) => {

    return renameId(await collection.findOneAndDelete({_id: id}));
}

export const updateStudent = async (id, data) => {
    return renameId(await collection.findOneAndUpdate({_id: id},
        {$set: data},
        {returnDocument: 'after'}));
}

export const addScore = async (id, exam, score) => {
    return renameId(await collection.findOneAndUpdate({_id: id},
        {$set: {[`scores.${exam}`]: score}},
        {returnDocument: 'after'}));
}

export const findByName = async (name) => {
    //  const students = await collection.find().toArray();
    // let n =  name.toLowerCase().trim();
    // return students.filter(student => student.name.trim().toLowerCase() === n);

    const norm = name.trim();
    return collection.find({name: {$regex: `^${norm}$`, $options: "i"}}).toArray();


}

export const countByNames = async (names) => {
    // (await collection.find().toArray())
    //     .filter(s => names.map(n => n.trim().toLowerCase()).includes(s.name.toLowerCase()))
    //     .length; //very heavy for memory,if we will have a lot of names in DB

    return await collection.countDocuments({
        name: {$in: names.map(n => n.trim())},
    });

}

export const findByMinScore = async (exam, minScore) => {
    return renameId(await collection.find({[`scores.${exam}`]: {$gte: minScore}}).toArray());
}

function renameId(student) {
    if (student) {

        student.id = student._id;
        delete student._id;
    }
    return student;

}