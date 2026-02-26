import fs from "node:fs";

fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) console.log(err);
    else {
        const arr = data.trim().split('\n')
        arr.shift();

        const stats = arr.reduce((acc, curr) => {
const cells = curr.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
const survived =+cells[1];
const pasclass = +cells[2];
const sex =cells[4];
const age = +cells[5];
const fare = +cells[9]||0;

acc.totalFares+=fare;

if(pasclass===1){acc.sumFirst+=fare;acc.countFirst++}
if(pasclass ===2){acc.sumSecond+=fare;acc.countSecond++}
if(pasclass===3){acc.sumThird+=fare;acc.countThird++}

if(survived === 1){
    acc.survived++;
    if(age<18) acc.survChild++;
    else if(sex === 'male') acc.survMan++;
    else if(sex === 'female') acc.survWoman++;
}else {
    acc.nonSurvived++;
    if(age<18) acc.nonSurvChild++;
    else if(sex==='male') {
        acc.nonSurvMan++;
        if(pasclass===1) acc.BraveFromFirst++;
        if(pasclass===2) acc.BraveFromSec++;
        if(pasclass===3) acc.BraveFromThird++;
    }
    else if(sex==='female') acc.nonSurvWoman++;

} return acc


            },{
            totalFares: 0,
            sumFirst: 0, countFirst: 0,
            sumSecond: 0, countSecond: 0,
            sumThird: 0, countThird: 0,
            survived: 0, nonSurvived: 0,
            survMan: 0,survWoman: 0, survChild:0,
            nonSurvChild: 0,nonSurvMan: 0,nonSurvWoman: 0,
            BraveFromFirst: 0,BraveFromSec:0,BraveFromThird:0

            });
        console.log('====STATS====');
        console.log(`Total fares: ${stats.totalFares.toFixed(2)}`);
        console.log(`Average fare 1st class: ${(stats.sumFirst/stats.countFirst).toFixed(2)}`);
        console.log(`Average fare 2nd class: ${(stats.sumSecond/stats.countSecond).toFixed(2)}`);
        console.log(`Average fare 3rd class: ${(stats.sumThird/stats.countThird).toFixed(2)}`);
        console.log(`Survived: total: ${stats.survived}, man: ${stats.survMan}, woman: ${stats.survWoman}, children: ${stats.survChild}`);
        console.log(`Non-survived: total: ${stats.nonSurvived}, man: ${stats.nonSurvMan}, woman: ${stats.nonSurvWoman}, children: ${stats.nonSurvChild}`);
        console.log(`Total brave from first: ${stats.BraveFromFirst}`);
        console.log(`Total brave from second: ${stats.BraveFromSec}`);
        console.log(`Total brave from third: ${stats.BraveFromThird}`);


    }
})


