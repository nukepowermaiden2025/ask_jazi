import fs from 'node:fs/promises'
const ALL = 'All Races'

type BirthOrigin = 'All Races' |
    'American Indian or Alaska Native' |
    'Asian or Pacific Islander' |
    'Hispanic' |
    'Non-Hispanic Black' |
    'Non-Hispanic White' |
    'Non-Hispanic, Single Race White' |
    'Non-Hispanic, Single Race Black' |
    'Non-Hispanic, Single Race American Indian or Alaska Native' |
    'Non-Hispanic, Single Race Asian' |
    'Non-Hispanic, Single Race Native Hawaiian or Pacific Islander' |
    null

enum BIRTH_ORIGIN {
    ALL = 'All',
    NATIVE = 'Native',
    ASIAN_PACIFIC = 'AsianPacific',
    HISPANIC = 'Hispanic',
    BLACK = 'Black',
    WHITE = 'White'
} 

class Birth {
    year: string | null
    race: BirthOrigin | null
    age: string | null
    rate: number | null
    isBlack: boolean | null

    constructor() {
        this.year = null
        this.race = null
        this.age = ''
        this.rate = 0
        this.isBlack = false
    }

    static originBlack = 'Non-Hispanic Black'

    isAAOrBlackOrigin(race: string) {
        return this.race === 
    }
}
//create a function to run everything
(async () => {
    //create a variable for the file
    //Use fs to read the file
    const data = await fs.readFile('./birth_rates.csv', { encoding: 'utf-8' })
    console.log(data)
    console.log(typeof data)
})()