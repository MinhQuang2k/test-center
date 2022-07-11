'use strict'

// const fs = require('fs');
import readline from 'readline'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
process.stdin.resume()
process.stdin.setEncoding('utf-8')

let inputString = ''
let currentLine = 0

rl.on('line', (line) => {
  if (line === '^D') {
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

function functionExample(parameter1) {
  return parameter1
}
function main() {
  const parameter1 = readLine()
  const result = functionExample(parameter1)
  console.log(result)
}
