import fs from "node:fs";
import readline from "node:readline";


// See file train.csv with information about "Titanic" passengers.
// 1.Calculate total fares;
// 2.Calculate average fare for 1,2,3 classes of travel;
// 3.Calculate total quantity of survived and non survived passengers;
// 4.Calculate total quantity of survived and non survived men, women and
// children(under 18 years old)

const fileStream = fs.createReadStream(new URL('../train.csv', import.meta.url)); // абсолютный путь к файлу(из вебинара)
const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let isFirstLine = true;
let fares = 0;

let First = 0;
let sumFirst = 0;
let survChild = 0;
let nonSurvChild = 0;
let Second = 0;
let sumSecond = 0;
let survWoman = 0;
let nonSurvWoman = 0;
let Third = 0;
let sumThird = 0;
let survMan = 0;
let nonSurvMan = 0;

let statsSurv = 0;
let statsNonSurv = 0



reader.on('line', (line) => {
    if (isFirstLine) {
        isFirstLine = false
        return;
    }
    const cells = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    fares += +cells[9];
    if (+cells[2] === 1) {
        First++;
        sumFirst += +cells[9];
    }
    if (+cells[2] === 2) {
        Second++;
        sumSecond += +cells[9];
    }
    if (+cells[2] === 3) {
        Third++;
        sumThird += +cells[9];
    }

    if (+cells[1] === 1) {
        statsSurv++
        if (!isNaN(+cells[5]) && +cells[5] < 18) {
            survChild++;
        } else {
            if (cells[4] === "male") {
                survMan++
            } else if (cells[4] === "female") {
                survWoman++
            }
        }


    } else {
        statsNonSurv++;
        if (!isNaN(+cells[5]) && +cells[5] < 18) {
            nonSurvChild++
        } else {
            if (cells[4] === "male") {
                nonSurvMan++
            } else if (cells[4] === "female") {
                nonSurvWoman++
            }
        }

    }

})

reader.on('close', (line) => {
    console.log('====buffer====')
    console.log(`Total fares = ${Number(fares.toFixed(2))}`);
    console.log(`Total avgFirst = ${Number(sumFirst / First).toFixed(2)}`);
    console.log(`Total avgSecond = ${Number(sumSecond / Second).toFixed(2)}`);
    console.log(`Total avgThird = ${Number(sumThird / Third).toFixed(2)}`);
    console.log(`Survived = total: ${statsSurv}, children: ${survChild}, woman: ${survWoman}, man: ${survMan}`);
    console.log(`Non-survived = total: ${statsNonSurv}, children: ${nonSurvChild}, woman: ${nonSurvWoman}, man: ${nonSurvMan}`);


})

reader.on('error', (error) => {
    console.log(error);
})



