'use strict'

import fs from 'fs'
import readline from 'readline'
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})
process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine=0

rl.on('line', (line) => {
   if(line === '^D') {
      rl.close()
   }
   inputString += line + ' '
})

rl.on('close', () => {
   inputString = inputString.split(' ')
   inputString = inputString.slice(0, inputString.length - 1)
   main()
})

function readLine() {
   return inputString[currentLine++]
}

function functionName(param1, param2, param3) {
   //code here
 
  return param3
}

function main() {
   const param1 = parseInt(readLine().trim(), 10) != 0
   
   const param2_count = parseInt(readLine().trim(), 10)
   const param2 = []

   for(let i = 0; i < param2_count; i++) {
      const param2_item = readLine()
      param2.push(param2_item)
   }

   const param3_rows = parseInt(readLine().trim(), 10)
   const param3_columns = parseInt(readLine().trim(), 10)
   let param3 = Array.from(Array(param3_rows), () => new Array(param3_columns));
   for(let i = 0; i< param3_rows; i++) {
      for(let j = 0; j < param3_columns; j++)
      {
         param3[i][j] = readLine()
      }
   }

   let result = functionName(param1, param2, param3)
   result = result.join('\n').replace(/,/g, ' ')
   console.log(result)
}