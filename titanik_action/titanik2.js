import fs from "node:fs";
import readline from "node:readline";


const fileStream = fs.createReadStream(new URL('../train.csv', import.meta.url));
const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
})

// constants
let isFirstLine = true;
const stats = {
    totalFares: 0,
    sumFirst: 0, countFirst: 0,
    sumSecond: 0, countSecond: 0,
    sumThird: 0, countThird: 0,
    survived: 0, nonSurvived: 0,
    survMan: 0, survWoman: 0, survChild: 0,
    nonSurvChild: 0, nonSurvMan: 0, nonSurvWoman: 0,
    BraveFromFirst: 0, BraveFromSec: 0, BraveFromThird: 0
};

reader.on('line', (line) => {
    if (isFirstLine) {
        isFirstLine = false;
        return;
    }
    const cells = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    const survived = +cells[1];
    const pasclass = +cells[2];
    const sex = cells[4];
    const age = +cells[5];
    const fare = +cells[9] || 0;

    stats.totalFares += fare;

    if (pasclass === 1) {
        stats.sumFirst += fare;
        stats.countFirst++;
    }
    if (pasclass === 2) {
        stats.sumSecond += fare;
        stats.countSecond++;
    }
    if (pasclass === 3) {
        stats.sumThird += fare;
        stats.countThird++;
    }

    if (survived === 1) {
        stats.survived++;
        if (age < 18) stats.survChild++;
        else if (sex === 'male') stats.survMan++;
        else if (sex === 'female') stats.survWoman++;
    } else {
        stats.nonSurvived++;
        if (age < 18) stats.nonSurvChild++;
        else if (sex === 'male') {
            stats.nonSurvMan++;
            if (pasclass === 1) stats.BraveFromFirst++;
            if (pasclass === 2) stats.BraveFromSec++;
            if (pasclass === 3) stats.BraveFromThird++;
        } else if (sex === 'female') stats.nonSurvWoman++;
    }
});

reader.on('close', () => {
    console.log('====STATS====');
    console.log(`Total fares: ${stats.totalFares.toFixed(2)}`);
    console.log(`Average fare 1st class: ${(stats.sumFirst / stats.countFirst).toFixed(2)}`);
    console.log(`Average fare 2nd class: ${(stats.sumSecond / stats.countSecond).toFixed(2)}`);
    console.log(`Average fare 3rd class: ${(stats.sumThird / stats.countThird).toFixed(2)}`);
    console.log(`Survived: total: ${stats.survived}, man: ${stats.survMan}, woman: ${stats.survWoman}, children: ${stats.survChild}`);
    console.log(`Non-survived: total: ${stats.nonSurvived}, man: ${stats.nonSurvMan}, woman: ${stats.nonSurvWoman}, children: ${stats.nonSurvChild}`);
    console.log(`Total brave from first: ${stats.BraveFromFirst}`);
    console.log(`Total brave from second: ${stats.BraveFromSec}`);
    console.log(`Total brave from third: ${stats.BraveFromThird}`);


})







