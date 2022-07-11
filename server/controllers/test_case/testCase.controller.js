import * as generate from '../../utils/generateCode.js'
import { PythonShell } from 'python-shell'
import path from 'path'
import { spawn, exec, execFile } from 'child_process'
// import { performance } from 'perf_hooks' //https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
export const codePathPython = path.resolve('code/python')
export const codePathPhp = path.resolve('code/php')
export const codePathNode = path.resolve('code/nodejs')
export const codePathJava = path.resolve('code/java')
export const codePathC = path.resolve('code/c')

export const _testCodePhp = async (jsonString) => {
  const {
    success,
    err = '',
    results,
  } = await new Promise((resolve, reject) => {
    const child = spawn(
      'C:\\Users\\DELL\\Downloads\\php-8.1.7-nts-Win32-vs16-x64\\php.exe',
      [codePathPhp + '\\main.php']
    )
    child.stdin.setEncoding('utf-8')
    child.stderr.setEncoding('utf8')
    // child.stdout.pipe(process.stdout)
    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })
    let error = ''
    child.on('error', (err) => {
      error += err
    })
    child.stdout.on('error', (err) => {
      error += err
    })
    child.stderr.on('data', (err) => {
      error += err
    })
    child.on('exit', () => {
      if (output !== '') {
        resolve({ success: true, results: output })
      } else {
        reject({ success: false, err: error || 'output is empty or null' })
      }
    })
    child.stdin.write(jsonString + '\n')
    child.stdin.end()
  })
  if (!success) {
    return err
  }
  return results
}

export const _testCodeJava = async (jsonString) => {
  const {
    success,
    err = '',
    results,
  } = await new Promise((resolve, reject) => {
    const child = spawn(
      'C:\\Program Files\\Java\\jdk-18.0.1.1\\bin\\java.exe',
      [codePathJava + '\\user_solution.java']
    )
    child.stdin.setEncoding('utf-8')
    child.stderr.setEncoding('utf8')
    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })
    let error = ''
    child.on('error', (err) => {
      error += err
    })
    child.stdout.on('error', (err) => {
      error += err
    })
    child.stderr.on('data', (err) => {
      error += err
    })
    child.on('exit', () => {
      if (output !== '') {
        if (output.endsWith('\n')) {
          output = output.substring(0, output.lastIndexOf('\n'))
        }
        if (output.endsWith('\r')) {
          output = output.substring(0, output.lastIndexOf('\r'))
        }
        resolve({ success: true, results: output })
      } else {
        reject({ success: false, err: 'output is empty or null' })
      }
    })
    child.stdin.write(jsonString + '\n')
    child.stdin.end()
  })
  if (!success) {
    return err
  }
  return results
}

export const _testCodeNode = async (jsonString) => {
  const {
    success,
    err = '',
    results,
  } = await new Promise((resolve, reject) => {
    const child = spawn('C:\\Program Files\\nodejs\\node.exe', [
      codePathNode + '\\user_solution.js',
    ])
    let output = ''
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    child.stdout.on('data', function (data) {
      data = data.toString()
      output += data
    })
    let error = ''
    child.on('error', (err) => {
      error += err
    })
    child.stdout.on('error', (err) => {
      error += err
    })
    child.stderr.on('data', (err) => {
      error += err
    })
    child.on('close', function () {
      if (output !== '') {
        if (output.endsWith('\n')) {
          output = output.substring(0, output.lastIndexOf('\n'))
        }
        resolve({ success: true, results: output })
      } else {
        reject({ success: false, err })
      }
    })
    child.stdin.write(jsonString + '\n^D\n')
    child.stdin.end()
  })
  if (!success) {
    return err
  }
  return results
}

//compile to get user_solution.exe then run it with input
export const _testCodeC = async (jsonString) => {
  const {
    success,
    err = '',
    results,
  } = await new Promise((resolve, reject) => {
    const compiler = spawn('gcc', [
      `${codePathC}\\user_solution.c`,
      '-o',
      `${codePathC}\\user_solution`,
      `-std=c99`,
    ])
    let compilerError = ''
    compiler.stderr.on('data', (data) => {
      compilerError += data
    })
    compiler.on('close', (code) => {
      if (code === 0) {
        let output = ''
        let error = ''
        const child = spawn(`${codePathC}\\user_solution`)
        child.stdout.setEncoding('utf-8')
        child.stderr.setEncoding('utf-8')
        child.stdin.setEncoding('utf-8')
        child.on('error', (err) => {
          reject({ success: false, err })
        })
        child.stdout.on('data', (chunk) => {
          output += chunk.toString()
        })
        child.stderr.on('data', (data) => {
          error += data
        })
        child.on('close', () => {
          if (output !== '') {
            output = output.replace(/\r/g, '')
            if (output.endsWith(' \n')) {
              output = output.substring(0, output.lastIndexOf(' \n'))
            }
            resolve({ success: true, results: output })
          } else {
            reject({ success: false, err: error })
          }
        })
        child.stdin.write(jsonString + '\n')
        child.stdin.end()
      } else {
        reject({ success: false, err: compilerError })
      }
    })
    compiler.stdin.end()
  })
  if (!success) {
    return err
  }
  return results
}
export const _testCodePython = async (option) => {
  const {
    success,
    err = '',
    results,
  } = await new Promise((resolve, reject) => {
    PythonShell.run('main.py', option, function (err, results) {
      if (err) {
        reject({ success: false, err })
      }
      resolve({ success: true, results })
    })
  })
  if (!success) {
    return err
  }
  return results
}

export const generateCode = (req, res) => {
  const { function_name, return_type, programming_lang, function_parameters } =
    req.body
  if (
    ![
      'string',
      'integer',
      'long-integer',
      'float',
      'double',
      'boolean',
      'character',
      'string-array',
      'integer-array',
      'long-integer-array',
      'float-array',
      'double-array',
      'boolean-array',
      'character-array',
      'string-2d-array',
      'integer-2d-array',
      'long-integer-2d-array',
      'float-2d-array',
      'double-2d-array',
      'boolean-2d-array',
      'character-2d-array',
    ].includes(return_type)
  ) {
    res.status(400).json({ message: 'please provide a valid return type!' })
  }
  const pyCode = generate.getCodePython(
    function_name,
    function_parameters,
    return_type
  )
  const phpCode = generate.getCodePhp(
    function_name,
    function_parameters,
    return_type
  )
  const nodeCode = generate.getCodeNode(
    function_name,
    function_parameters,
    return_type
  )
  const javaCode = generate.getCodeJava(
    function_name,
    function_parameters,
    return_type
  )
  const cCode = generate.getCodeC(
    function_name,
    function_parameters,
    return_type
  )
  res.status(200).json({
    data: {
      python: pyCode,
      php: phpCode,
      node: nodeCode,
      java: javaCode,
      C: cCode,
    },
  })
}
