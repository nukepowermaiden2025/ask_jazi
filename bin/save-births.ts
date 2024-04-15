import fs from 'node:fs/promises'
import * as _ from 'lodash'

const ALL = 'All Races'
const AMERICAN_NATIVE =  'American Indian or Alaska Native' 
const ASIAN_PACIFIC = 'Asian or Pacific Islander' 
const HISPANIC = 'Hispanic' 
const NON_HIS_BLACK = 'Non-Hispanic Black' 
const NON_HIS_WHITE = 'Non-Hispanic White' 
const NON_HIS_RACE_WHITE = 'Non-Hispanic, Single Race White' 
const NON_HIS_RACE_BLACK = 'Non-Hispanic, Single Race Black' 
const NON_HIS_RACE_NATIVE = 'Non-Hispanic, Single Race American Indian or Alaska Native' 
const NON_HIS_ASIAN = 'Non-Hispanic, Single Race Asian' 
const NON_HIS_PACIFIC_IL = 'Non-Hispanic, Single Race Native Hawaiian or Pacific Islander' 


type BirthOrigin = typeof ALL |
typeof AMERICAN_NATIVE |
typeof ASIAN_PACIFIC |
typeof HISPANIC |
typeof NON_HIS_BLACK |
typeof NON_HIS_WHITE |
typeof NON_HIS_RACE_WHITE |
typeof NON_HIS_RACE_BLACK |
typeof NON_HIS_RACE_NATIVE |
typeof NON_HIS_ASIAN |
typeof NON_HIS_PACIFIC_IL | null

enum BIRTH_ORIGIN {
    ALL = 'All',
    NATIVE = 'Native',
    ASIAN_PACIFIC = 'AsianPacific',
    HISPANIC = 'Hispanic',
    BLACK = 'Black',
    WHITE = 'White'
} 

class BirthStat {
    year: string 
    race: BirthOrigin 
    age: string 
    rate: number 
    isBlack: boolean 

    constructor(race: BirthOrigin) {
        this.year = ''
        this.race = race
        this.age = '0'
        this.rate = 0
        this.isBlack = this.isAAOrBlackOrigin()
    }

    static originBlack = 'Non-Hispanic Black'

    isAAOrBlackOrigin() {
        if(this.race?.trim() === '') return false
        
        return [NON_HIS_BLACK, NON_HIS_RACE_BLACK].includes(this.race as string)//Look up how to use partials again
      
    }
}
//create a function to run everything
(async () => {
    //create a variable for the file
    //Use fs to read the file
    const data = await fs.readFile('./birth_rates.csv', { encoding: 'utf-8' })
    //Remove the first row of data and save as columns
    const rows = data.split('\n')
    const cols = rows[0].split(',').map((c: string, idx:number) => {
        if (c === 'Race or Hispanic Origin') {
            return 'race'
        } else if (c === 'Age Group') {
            return 'age'
        } else if (c === 'Birth Rate') {
            return 'rate'
        }
        return c.toLowerCase()
    })
    const raceCol = 1

    const stats = rows.slice(1).map((row: string) => {
        const item = row.split(',')

        //Create an instance of birth origin
        let newStat = new BirthStat(item[raceCol] as BirthOrigin) 
     
        //Get the cols and map them into an array set with key/value object
        const data = cols.map((d: any, idx:number) => {
            return { [d]: item[idx]}
        })
     
        //Convert the array of objects into one object
        const birthObject = Object.assign({}, ...data)
        const result = { ...newStat, ...birthObject }
        console.log(result.isBlack)
        console.log(typeof result)
    })

    console.log(typeof data)
})()