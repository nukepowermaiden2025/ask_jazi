"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const ALL = 'All Races';
const AMERICAN_NATIVE = 'American Indian or Alaska Native';
const ASIAN_PACIFIC = 'Asian or Pacific Islander';
const HISPANIC = 'Hispanic';
const NON_HIS_BLACK = 'Non-Hispanic Black';
const NON_HIS_WHITE = 'Non-Hispanic White';
const NON_HIS_RACE_WHITE = 'Non-Hispanic, Single Race White';
const NON_HIS_RACE_BLACK = 'Non-Hispanic, Single Race Black';
const NON_HIS_RACE_NATIVE = 'Non-Hispanic, Single Race American Indian or Alaska Native';
const NON_HIS_ASIAN = 'Non-Hispanic, Single Race Asian';
const NON_HIS_PACIFIC_IL = 'Non-Hispanic, Single Race Native Hawaiian or Pacific Islander';
var BIRTH_ORIGIN;
(function (BIRTH_ORIGIN) {
    BIRTH_ORIGIN["ALL"] = "All";
    BIRTH_ORIGIN["NATIVE"] = "Native";
    BIRTH_ORIGIN["ASIAN_PACIFIC"] = "AsianPacific";
    BIRTH_ORIGIN["HISPANIC"] = "Hispanic";
    BIRTH_ORIGIN["BLACK"] = "Black";
    BIRTH_ORIGIN["WHITE"] = "White";
})(BIRTH_ORIGIN || (BIRTH_ORIGIN = {}));
class BirthStat {
    constructor(race) {
        this.year = '';
        this.race = race;
        this.age = '0';
        this.rate = 0;
        this.isBlack = false;
    }
    isAAOrBlackOrigin() {
        if (this.race) {
            return [NON_HIS_BLACK, NON_HIS_RACE_BLACK].includes(this.race);
        }
        return false;
    }
}
BirthStat.originBlack = 'Non-Hispanic Black';
//create a function to run everything
(async () => {
    //create a variable for the file
    //Use fs to read the file
    const data = await promises_1.default.readFile('./birth_rates.csv', { encoding: 'utf-8' });
    //Remove the first row of data and save as columns
    const rows = data.split('\n');
    const cols = rows[0].split(',').map((c, idx) => {
        if (c === 'Race or Hispanic Origin') {
            return 'race';
        }
        else if (c === 'Age Group') {
            return 'age';
        }
        else if (c === 'Birth Rate') {
            return 'rate';
        }
        return c.toLowerCase();
    });
    const raceCol = 1;
    const stats = rows.splice(1, 1).map((row) => {
        const item = row.split(',');
        let newStat = new BirthStat(item[raceCol]);
        const data = cols.map((d, idx) => {
            return { [d]: item[idx] };
        });
        const birthObject = Object.assign({}, ...data);
        const result = Object.assign(Object.assign({}, newStat), birthObject);
        console.log(result);
    });
    console.log(cols);
    console.log(rows[10]);
    console.log(typeof data);
})();
