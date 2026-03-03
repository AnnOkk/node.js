export class Titanic {
    constructor(separator) {
        this.separator = separator;

        this.totalFares = 0;

        this.classSums = { 1: 0, 2: 0, 3: 0 };
        this.classCounts = { 1: 0, 2: 0, 3: 0 };

        this.totalSurvived = { Survived: 0, 'Non survived': 0 };
        this.totalSurvivedByGender = {};
        this.totalSurvivedChildren = {};
    }

    processLine(line) {
        const c = line.split(this.separator);

        const survived = +c[1];
        const pClass = +c[2];
        const gender = c[4];
        const age = +c[5];
        const fare = +c[9] || 0;

        //  fares
        this.totalFares += fare;

        if (this.classSums[pClass] !== undefined) {
            this.classSums[pClass] += fare;
            this.classCounts[pClass]++;
        }

        //  survived
        const survKey = survived ? 'Survived' : 'Non survived';
        this.totalSurvived[survKey]++;

        //  survived by gender
        const genderKey =
            gender + ' ' + (survived ? 'survived' : 'non survived');

        this.totalSurvivedByGender[genderKey] =
            (this.totalSurvivedByGender[genderKey] || 0) + 1;

        //  children
        if (!isNaN(age) && age < 18) {
            const childKey =
                survived ? 'Children survived' : 'Children non survived';

            this.totalSurvivedChildren[childKey] =
                (this.totalSurvivedChildren[childKey] || 0) + 1;
        }
    }

    get avgFaresByClasses() {
        const result = {};

        for (const key in this.classSums) {
            if (this.classCounts[key]) {
                result[key] = +(
                    this.classSums[key] / this.classCounts[key]
                ).toFixed(2);
            }
        }

        return result;
    }
}