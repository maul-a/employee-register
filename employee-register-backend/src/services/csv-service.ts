import { parse } from 'csv-parse'

class CSVService {
  parseCSV(data: Buffer) {
    return new Promise((res, rej) => {
      parse(data, (err, records) => {
        if (err) {
          rej(err)
        }
        res(records)
      })
    })
  }
  
  formatCSV(data: any[]) {
    const res: any[] = []
    for(let i = 1; i<data.length; i++) {
      const obj: any = {}
      for(let j=0; j<data[i].length; j++) {
        obj[data[0][j]] = data[i][j]
      }
      res[i-1] = obj
    }
    return res
  }
}

export default CSVService