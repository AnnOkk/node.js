import fs from 'node:fs';
import {Titanic} from "./titanik_action/Titanic.js";
import readline from "node:readline";

const fileStream = fs.createReadStream(new URL('./train.csv', import.meta.url));
const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
})

const stats = new Titanic( /,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
let isFirstLine = true;

reader.on('line', (line) => {
    // console.log('LINE:', line.slice(0, 50));
    if(isFirstLine) {
        isFirstLine = false;
        return;
    }
    stats.processLine(line);



})


    reader.on('close', () => {
        console.log('FILE CLOSED');

        console.log('==== STATS ====');
        console.log('Total fares:', stats.totalFares.toFixed(2));
        console.log('Average fares by classes:', stats.avgFaresByClasses);
        console.log('Survived:', stats.totalSurvived);
        console.log('Survived by gender:', stats.totalSurvivedByGender);
        console.log('Children stats:', stats.totalSurvivedChildren);

})
 reader.on('error', (error) => {
     console.log('ERROR:', error.message);
 })

console.log(process.cwd());

// fs.readFile('./train.csv', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         const arr = data.split('\n');
//         arr.shift();
//         const stats = new Titanic(arr, /,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
//         console.log(`Total fares:`, stats.totalFares.toFixed(2));
//         console.log(`Average fares by classes:`, stats.avgFaresByClasses)
//         console.log(stats.totalSurvived);
//         console.log(stats.totalSurvivedByGender);
//         console.log(stats.totalSurvivedChildren)
//     }
// })