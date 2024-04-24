import fs from 'fs/promises'
import _ from 'lodash'

//Get a file and process it
//make it into a class and return the object
//Extract ages from the string

class Birth {
    race: string
    year: string
    ages: number []
    rate: number

    constructor() {
        this.race = ''
        this.year = ''
        this.ages = []
        this.rate = 0
    }
}


(async () => {
    //import the file
    const data = await fs.readFile('./birth_rates.csv', 'utf-8')
    const rows = data.split('\n').slice(1)
    
    const births = rows.map((birth: string) => {
        if (birth.trim() === '') return
        const stat = birth.split(',')
        const birthStat = new Birth()
        birthStat.year = stat[0]
        birthStat.race = stat[1]
        // console.log(stat)
        const ageRange = stat[2]
        //console.log(ageRange)
        const hasIt = _.endsWith(stat[2], 'Years')
        if (!hasIt) {
            stat.splice(2,1)
            console.log(stat)
            console.log(stat[2])
        }
    
      
        //console.log(ageRange)
            
        //     .map((a: string) => {
        //     return parseInt(a)
        // })
        //console.log(ageRange)

    })

    //map the rows
    //for each row return an object with the rows matching the data object
    //key is column row is expected index index - we can do this becuase the rows are in the same order
    
    //return the list of data objects


})();


function fillAges(ageRange: number[]) {

}