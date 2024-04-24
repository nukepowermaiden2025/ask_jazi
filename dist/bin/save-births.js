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
        this.isBlack = this.isAAOrBlackOrigin();
    }
    isAAOrBlackOrigin() {
        var _a;
        if (((_a = this.race) === null || _a === void 0 ? void 0 : _a.trim()) === '')
            return false;
        return [NON_HIS_BLACK, NON_HIS_RACE_BLACK].includes(this.race); //Look up how to use partials again
    }
}
BirthStat.originBlack = 'Non-Hispanic Black';
const generateStats = (rows) => {
    let colCount = 0;
    const stats = rows.map((row) => {
        const cleanRow = row.replace(/\bNon-Hispanic[,]?/g, '');
        const stat = cleanRow.split(',');
        if (colCount < stat.length)
            colCount = stat.length;
        console.log(colCount);
    });
    return { stats, colCount };
};
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
    //const { colCount, stats } = generateStats(rows)
    //console.log(`This is max number of columns ${colCount}`)
    //TODO extract into a new function
    const stats = rows.slice(1).map((row) => {
        //Find Non-Hispanic and remove it from the set
        const cleanRow = row.replace(/\bNon-Hispanic\b[,]?/gi, '');
        const item = row.split(',');
        //Create an instance of birth origin
        let newStat = new BirthStat(item[1]);
        //Get the cols and map them into an array set with key/value object
        const data = cols.map((d, idx) => {
            return { [d]: item[idx] };
        });
        //Convert the array of objects into one object
        const birthObject = Object.assign({}, ...data);
        const result = Object.assign(Object.assign({}, newStat), birthObject);
        console.log(result.isBlack);
        console.log(typeof result);
    });
    console.log(typeof data);
})();
