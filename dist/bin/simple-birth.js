"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const lodash_1 = __importDefault(require("lodash"));
//Get a file and process it
//make it into a class and return the object
//Extract ages from the string
class Birth {
    constructor() {
        this.race = '';
        this.year = '';
        this.ages = [];
        this.rate = 0;
    }
}
(async () => {
    //import the file
    const data = await promises_1.default.readFile('./birth_rates.csv', 'utf-8');
    const rows = data.split('\n').slice(1);
    const births = rows.map((birth) => {
        if (birth.trim() === '')
            return;
        const stat = birth.split(',');
        const birthStat = new Birth();
        birthStat.year = stat[0];
        birthStat.race = stat[1];
        // console.log(stat)
        const ageRange = stat[2];
        //console.log(ageRange)
        const hasIt = lodash_1.default.endsWith(stat[2], 'Years');
        if (!hasIt) {
            stat.splice(2, 1);
            console.log(stat);
            console.log(stat[2]);
        }
        //console.log(ageRange)
        //     .map((a: string) => {
        //     return parseInt(a)
        // })
        //console.log(ageRange)
    });
    //map the rows
    //for each row return an object with the rows matching the data object
    //key is column row is expected index index - we can do this becuase the rows are in the same order
    //return the list of data objects
})();
function fillAges(ageRange) {
}
