// function param
const translateParamType = {
  boolean: 'bool',
  int: 'int',
  void: 'str',
  float: 'float',
  double: 'float',
  string: 'str',
  char: 'str',
  'long-integer': 'int',
  'integer-array': ['int'],
  'long-integer-array': ['int'],
  'string-array': ['str'],
  'character-array': ['str'],
  'float-array': ['float'],
  'double-array': ['float'],
  'boolean-array': ['bool'],
  'integer-2d-array': ['int-2d'],
  'long-integer-2d-array': ['int-2d'],
  'string-2d-array': ['str-2d'],
  'character-2d-array': ['str-2d'],
  'float-2d-array': ['float-2d'],
  'double-2d-array': ['float-2d'],
  'boolean-2d-array': ['bool-2d'],
}
export const getCodePhp = (Fname, Fparams, returnType) => {
  let translate = { ...translateParamType }
  translate['long-integer'] = 'long'
  translate['string'] = 'string'
  translate['double'] = 'double'
  const function_params_name = Fparams.map((params) => '$' + params.name).join(
    ', '
  )
  const get_2d_array_str = (type) => {
    if (type === 'bool') {
      return `intval(trim(fgets(STDIN))) !== 0;`
    } else if (type === 'str') {
      return `trim(fgets(STDIN));`
    }
  }
  const phpHead = `<?php\n`
  const phpBody = `function ${Fname} (${function_params_name}) {\n   //code here\n}\n\n\n`

  let phpFooter = Fparams.map(({ type, name }) => {
    if (typeof translate[type] !== 'object') {
      return type === 'string'
        ? `$${name} = readline();`
        : `$${name} = (${translate[type]})readline();`
    } else if (
      typeof translate[type] === 'object' &&
      !translate[type][0].includes('-2d')
    ) {
      return `$${name}_count = intval(trim(fgets(STDIN)));\n$parameter1 = [];\nfor ($i = 0; $i < $${name}_count; $i++) {\n    $${name}_item = ${get_2d_array_str(
        translate[type][0]
      )}\n$${name}[] = $${name}_item;\n}\n`
    } else {
      return `$${name}_rows = intval(trim(fgets(STDIN)));\n$${name}_columns = intval(trim(fgets(STDIN)));\n$${name} = array();\nfor ($i = 0; $i < $${name}_rows; $i++) {\n    $${name}_temp = rtrim(fgets(STDIN));\n    $${name}[] = ${
        type === 'string-2d-array'
          ? `preg_split('/ /', $${name}_temp, -1, PREG_SPLIT_NO_EMPTY);`
          : `array_map('${
              translate[type.replace('-2d', '')]
            }val', preg_split('/ /', $${name}_temp, -1, PREG_SPLIT_NO_EMPTY);`
      }\n}\n`
    }
  }).join('\n')
  if (!returnType.includes('array')) {
    phpFooter += `\n$result = ${Fname}(${function_params_name});\necho $result;`
  } else if (returnType.includes('-2d-array')) {
    phpFooter += `\n$result = ${Fname}(${function_params_name});\n$resultParts = [];\nforeach ($result as $row) {\n    $resultsParts[] = implode(' ', $row);\n}\necho implode('PHP_EOL', $resultParts);`
  } else {
    phpFooter += `\n$result = ${Fname}(${function_params_name});\n$resultParts = [];\nforeach ($result as $item) {\n    $resultsParts[] = $item;\n}\necho implode('PHP_EOL', $resultParts);`
  }
  return phpHead + phpBody + phpFooter
}

export const getCodePython = (Fname, Fparams, returnType) => {
  const function_params_name = Fparams.map((params) => params.name).join(', ')
  const pyHead = `#!/bin/python3\n\nimport math\nimport os\nimport random\nimport re\nimport sys\n\n`
  const pyBody = `def ${Fname} (${function_params_name}):\n    #code here\n    pass\n`
  let pyFooter = Fparams.map(({ type, name }) => {
    if (typeof translateParamType[type] !== 'object') {
      return `${name} = ${translateParamType[type]}(input())`
    } else if (
      typeof translateParamType[type] === 'object' &&
      !translateParamType[type][0].includes('-2d')
    ) {
      return `${name}_count = int(input())\n${name} = []\nfor i in range(${name}_count):\n    ${name}_item = ${translateParamType[type]}(input())\n    ${name}.append(${name}_item)`
    } else {
      return `${name}_rows = int(input())\n${name}_columns = int(input())\n${name} = []\nfor i in range(${name}_rows * ${name}_columns):\n    ${name}_temp = input()\n    ${name}.append(list(map(${
        translateParamType[type.replace('-2d', '')]
      }, ${name}_temp.split())))`
    }
  }).join('\n')
  if (!returnType.includes('array')) {
    pyFooter += `\nresult = ${Fname}(${function_params_name})\nprint(result)`
  } else if (returnType.includes('-2d-array')) {
    pyFooter += `\nresult = ${Fname}(${function_params_name})\nresultParts = []\nfor row in result:\n    resultParts.append(' '.join(map(str, row)))\nprint('\\n'.join(map(str, resultParts)))`
  } else {
    pyFooter += `\nresult = ${Fname}(${function_params_name})\nfor item in result:\n    print(item)`
  }
  return pyHead + pyBody + pyFooter
}

export const getCodeNode = (Fname, Fparams, returnType) => {
  let translate = { ...translateParamType }
  translate['int'] = 'parseInt(readLine().trim(), 10)'
  translate['boolean'] = 'parseInt(readLine().trim(), 10) != 0'
  translate['float'] = 'parseFloat(readLine().trim(), 10)'
  translate['double'] = 'parseFloat(readLine().trim(), 10)'
  translate['integer-array'] = 'parseInt(readLine().trim(), 10)'
  translate['boolean-array'] = 'parseInt(readLine().trim(), 10) != 0'
  translate['float-array'] = 'parseFloat(readLine().trim(), 10)'
  translate['double-array'] = 'parseFloat(readLine().trim(), 10)'
  translate['string'] = 'readLine()'
  translate['string-array'] = 'readLine()'
  translate['string-2d-array'] = 'readLine()'
  const function_params_name = Fparams.map((params) => params.name).join(', ')
  const nodeHead =
    "'use strict'\n\nimport fs from 'fs'\nimport readline from 'readline'\n"
  const nodeBody = `const rl = readline.createInterface({\n   input: process.stdin,\n   output: process.stdout,\n})\nprocess.stdin.resume()\nprocess.stdin.setEncoding('utf-8')\n\nlet inputString = ''\nlet currentLine=0\n\nrl.on('line', (line) => {\n   if(line === '^D') {\n      rl.close()\n   }\n   inputString += line + ' '\n})\n\nrl.on('close', () => {\n   inputString = inputString.split(' ')\n   inputString = inputString.slice(0, inputString.length - 1)\n   main()\n})\n\nfunction readLine() {\n   return inputString[currentLine++]\n}\n\nfunction ${Fname}(${function_params_name}) {\n   //code here\n}\n\n`
  let nodeFooter = Fparams.map(({ type, name }) => {
    if (type.includes('2d-array')) {
      return `   const ${name}_rows = ${translate['int']}\n   const ${name}_columns = ${translate['int']}\n   let ${name} = Array.from(Array(${name}_rows), () => new Array(${name}_columns));\n   for(let i = 0; i< ${name}_rows; i++) {\n      for(let j = 0; j < ${name}_columns; j++)\n      {\n         ${name}[i][j] = ${translate[type]}\n      }\n   }\n`
    } else if (type.includes('array')) {
      return `   const ${name}_count = ${translate['int']}\n   const ${name} = []\n\n   for(let i = 0; i < ${name}_count; i++) {\n      const ${name}_item = ${translate[type]}\n      ${name}.push(${name}_item)\n   }\n`
    } else {
      return `   const ${name} = ${translate[type]}\n   `
    }
  }).join('\n')
  if (returnType.includes('-2d-array')) {
    nodeFooter += `\n   let result = ${Fname}(${function_params_name})\n   result = result.join('\\n').replace(/\,/g, ' ')\n   console.log(result)`
  } else if (returnType.includes('-array')) {
    nodeFooter += `\n   let result = ${Fname}(${function_params_name})\n   result = result.join('\\n')\n   console.log(result)`
  } else {
    nodeFooter += `\n   const result = ${Fname}(${function_params_name})\n   console.log(result)`
  }
  const nodeFooterWrapper = `function main() {\n${nodeFooter}\n}`
  return nodeHead + nodeBody + nodeFooterWrapper
}

export const getCodeJava = (Fname, Fparams, returnType) => {
  let translate = { ...translateParamType }
  translate['string'] = 'bufferedReader.readLine()'
  translate['int'] = 'Integer.parseInt(bufferedReader.readLine().trim())'
  translate['long-integer'] = 'Long.parseLong(bufferedReader.readLine().trim())'
  translate['boolean'] =
    'Integer.parseInt(bufferedReader.readLine().trim()) != 0'
  translate['float'] = 'Float.parseFloat(bufferedReader.readLine().trim())'
  translate['double'] = 'Double.parseDouble(bufferedReader.readLine().trim())'
  translate['character'] = 'bufferedReader.readLine().charAt(0)'
  translate['string-array'] = ['List<String>', '']
  translate['integer-array'] = ['List<Integer>', '.map(Integer::parseInt)']
  translate['long-integer-array'] = ['List<Long>', '.map(Long::parseLong)']
  translate['float-array'] = ['List<Float>', '.map(Float::parseFloat)']
  translate['double-array'] = ['List<Double>', '.map(Double::parseDouble)']
  translate['character-array'] = ['List<Character>', '.map(e -> e.charAt(0))']
  translate['boolean-array'] = [
    'List<Boolean>',
    '.map(e -> Integer.parseInt(e) != 0)',
  ]
  translate['string-2d-array'] = [
    'List<List<String>>',
    'List<String>',
    'String',
    'bufferedReader.readLine().trim()',
  ]
  translate['integer-2d-array'] = [
    'List<List<Integer>>',
    'List<Integer>',
    'int',
    'Integer.parseInt(bufferedReader.readLine().trim())',
  ]
  translate['long-integer-2d-array'] = [
    'List<List<Long>>',
    'List<Long>',
    'long',
    'Long.parseLong(bufferedReader.readLine().trim())',
  ]
  translate['float-2d-array'] = [
    'List<List<Float>>',
    'List<Float>',
    'float',
    'Float.parseFloat(bufferedReader.readLine().trim())',
  ]
  translate['double-2d-array'] = [
    'List<List<Double>>',
    'List<Float>',
    'double',
    'Double.parseDouble(bufferedReader.readLine().trim())',
  ]
  translate['character-2d-array'] = [
    'List<List<Character>>',
    'List<Character>',
    'char',
    'bufferedReader.readLine().charAt(0)',
  ]
  translate['boolean-2d-array'] = [
    'List<List<Boolean>>',
    'List<Boolean>',
    'boolean',
    'Boolean.parseBoolean(bufferedReader.readLine().trim()) != 0',
  ]
  const function_params_name = Fparams.map(({ type, name }) => {
    if (type.includes('2d-array') || type.includes('-array')) {
      return `${translate[type][0]} ${name}`
    } else {
      return `${type} ${name}`
    }
  }).join(', ')
  let function_return_type = (return_type) => {
    if (return_type.includes('2d-array') || return_type.includes('-array')) {
      return translate[return_type][0]
    } else if (return_type === 'string') {
      return 'String'
    } else if (return_type === 'integer') {
      return 'integer'
    } else if (return_type === 'character') {
      return 'char'
    }
  }
  const javaHead = `import java.io.*;\nimport java.math.*;\nimport java.security.*;\nimport java.text.*;\nimport java.util.*;\nimport java.util.concurrent.*;\nimport java.util.regex.*;\nimport java.util.stream.Collectors;\nimport java.util.stream.IntStream;\n`
  const javaBody = `class Result {\n   public static ${function_return_type(
    returnType
  )} ${Fname}(${function_params_name}) {\n      //code here\n   }\n}`
  let javaFooter = `public class Main {\n   public static void main(String[] args) throws IOException {\n      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));\n      BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(System.out));\n`
  javaFooter += Fparams.map(({ type, name }) => {
    if (type.includes('-2d-array')) {
      return `      int ${name}Rows = Integer.parseInt(bufferedReader.readLine().trim());\n      int ${name}Columns = Integer.parseInt(bufferedReader.readLine().trim());\n      ${translate[type][0]} ${name} = new ArrayList<>();\n      for (int i = 0; i < ${name}Rows; i++) {\n         ${translate[type][1]} ${name}RowItems = new ArrayList<>();\n         for (int j = 0; j < ${name}Columns; j++) {\n            ${translate[type][2]} ${name}Item = ${translate[type][3]};\n            ${name}RowItems.add(${name}Item);\n         }\n         ${name}.add(${name}RowItems);\n      }\n`
    } else if (type.includes('-array')) {
      return `      int ${name}Count = Integer.parseInt(bufferedReader.readLine().trim());\n      ${translate[type][0]} ${name} = IntStream.range(0, ${name}Count).mapToObj(i -> {\n         try {\n            return bufferedReader.readLine().replaceAll(\"\\s+$\", \"\");\n         } catch (IOException ex) {\n            throw new RuntimeException(ex);\n         }\n      })\n      .map(String::trim)${translate[type][1]}.collect(Collectors.toList());`
    } else {
      return type === 'string'
        ? `      String ${name} = ${translate[type]};`
        : `      ${type} ${name} = ${translate[type]};`
    }
  }).join('\n')
  if (returnType.includes('-2d-array')) {
    javaFooter += `\n      ${
      translate[returnType][0]
    } result = Result.${Fname}(${Fparams.map(({ name }) => name).join(
      ', '
    )});\n      for (int i = 0; i < result.size(); i++) {\n        for(int j = 0; j< result.get(i).size(); j++) {\n            bufferedWriter.write(String.valueOf(result.get(i).get(j)));\n            if (j != result.get(i).size() - 1) {\n               bufferedWriter.write(\" \");\n            }\n         }\n         if (i != result.size() - 1) {\n            bufferedWriter.write(\"\\n\");\n         }\n      }\n      bufferedWriter.newLine();\n      bufferedReader.close();\n      bufferedWriter.close();\n   }\n}\n`
  } else if (returnType.includes('-array')) {
    javaFooter += `\n      ${
      translate[returnType][0]
    } result = Result.${Fname}(${Fparams.map(({ name }) => name).join(
      ', '
    )});\n      bufferedWriter.write(\n         result.stream()\n            .map(Object::toString)\n            .collect(Collectors.joining("\\n"))\n         + "\\n"\n      );\n      bufferedReader.close();\n      bufferedWriter.close();\n    }\n}\n`
  } else {
    javaFooter += returnType === 'string' ? '\n      String' : returnType
    javaFooter += ` result = Result.${Fname}(${Fparams.map(
      ({ name }) => name
    ).join(
      ', '
    )});\n      bufferedWriter.write(String.valueOf(result));\n      bufferedReader.close();\n      bufferedWriter.close();\n   }\n}\n`
  }
  return javaHead + javaFooter + javaBody
}

export const getCodeC = (Fname, Fparams, returnType) => {
  let translate = { ...translateParamType }
  translate['boolean'] = 'bool'
  translate['double'] = 'double'
  translate['double-array'] = 'double'
  translate['double-2d-array'] = 'double'
  translate['float'] = 'double'
  translate['float-array'] = 'double'
  translate['float-2d-array'] = 'double'
  translate['integer'] = 'int'
  translate['integer-array'] = 'int'
  translate['integer-2d-array'] = 'int'
  translate['long-integer'] = 'long int'
  translate['long-integer-array'] = 'long int'
  translate['long-2d-integer-array'] = 'long int'
  translate['string'] = 'char*'
  translate['string-array'] = 'char*'
  translate['string-2d-array'] = 'char*'
  const function_params_name = Fparams.map(({ type, name }) => {
    if (type.includes('2d-array')) {
      return `int ${name}_rows, int ${name}_cols, ${translate[type]}* ${name}`
    } else if (type.includes('-array')) {
      return `int ${name}_count, ${translate[type]}* ${name}`
    } else {
      if (type === 'string') {
        return `${translate[type]} ${name}[${name}_rows][${name}_cols]`
      }
      return `${translate[type]} ${name}`
    }
  }).join(', ')
  const call_function_params_name = Fparams.map(({ type, name }) => {
    if (type.includes('-2d-array')) {
      return `${name}_rows, ${name}_cols, ${name}`
    } else if (type.includes('-array')) {
      return `${name}_count,  ${name}`
    } else {
      if (type === 'string') {
        return `${name}[${name}_rows][${name}_cols]`
      }
      return `${name}`
    }
  }).join(', ')
  const parse_type = (type) => {
    if (type === 'int') {
      return 'parse_int(ltrim(rtrim(readline())))'
    } else if (type.includes('long')) {
      return 'parse_long(ltrim(rtrim(readline())))'
    }
    return 'ltrim(rtrim(readline()))'
  }
  const printf_type = (type) => {
    if (type === 'string') {
      return `"%s "`
    } else if (['integer', 'float', 'double']) {
      return `"%d "`
    } else if (type === 'character') {
      return `"%c "`
    }
  }
  const cHead = `#include <assert.h>\n#include <ctype.h>\n#include <limits.h>\n#include <math.h>\n#include <stdbool.h>\n#include <stddef.h>\n#include <stdint.h>\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <malloc.h>\n\nchar *readline();\nchar* ltrim(char*);\nchar* rtrim(char*);\nint parse_int(char*);\nlong parse_long(char*);\n\n`
  let cBody = ''
  if (returnType.includes('-2d-array')) {
    cBody = `void printArr(int rows, int cols, ${
      translate[returnType.replace('-2d-array', '')]
    }* arr) {\n   for(int i = 0; i< rows; i++) {\n      for(int j = 0;j < cols; j++) {\n         printf(${printf_type(
      returnType.replace('-2d-array', '')
    )}, *(arr + i * cols + j));\n         fflush(stdout);\n      }\n      printf("\\n");\n      fflush(stdout);\n   }\n}\nvoid *${Fname}(${function_params_name}){\n   //code here\n}\n\n`
  } else {
    cBody = `${
      translate[returnType.replace('-array', '')]
    } *${Fname}(${function_params_name}){\n   //code here\n}\n\n`
  }
  let cFooter = `int main()\n{\n   `
  cFooter += Fparams.map(({ type, name }) => {
    console.log(type, translate[type])
    if (type.includes('2d-array')) {
      return `int ${name}_rows = ${parse_type(
        'int'
      )};\n   int ${name}_cols = ${parse_type('int')};\n   ${
        translate[type]
      } ${name}_arr[${name}_rows][${name}_cols];\n\n   for(int i = 0; i < ${name}_rows; i++) {\n      for(int j = 0; j < ${name}_cols; j++) {\n         ${
        translate[type]
      } ${name}_item = ${parse_type(
        translate[type]
      )};\n         ${name}_arr[i][j] = ${name}_item;\n      }\n   }\n   ${
        translate[type]
      } *${name} = &${name}_arr[0][0];\n`
    } else if (type.includes('-array')) {
      return `int ${name}_count = ${parse_type('int')};\n   ${
        translate[type]
      }* ${name} = calloc(${name}_count, sizeof(${
        translate[type]
      }));\n   for (int i = 0;i < ${name}_count; i++) {\n      ${
        translate[type]
      } ${name}_item = ${parse_type(
        type
      )};\n      *(${name} + i) = ${name}_item;\n   }\n`
    } else {
      if (type === 'string') {
        return `char ${name}[] = ${parse_type(type)}; `
      }
      return `${translate[type]} ${name} = ${parse_type(type)};`
    }
  }).join('\n')
  if (returnType.includes('-2d-array')) {
    cFooter += `${Fname}(${call_function_params_name});\n}\n`
  }
  cFooter += `char* readline() {\n   size_t alloc_length = 1024;\n   size_t data_length = 0;\n   char* data = malloc(alloc_length);\n   while (true) {\n      char* cursor = data + data_length;\n       char* line = fgets(cursor, alloc_length - data_length, stdin);\n       if (!line) {\n         break;\n      }\n      data_length += strlen(cursor);\n      if (data_length < alloc_length - 1 || data[data_length - 1] == '\\n') {\n         break;\n      }\n      alloc_length <<= 1;\n      data = realloc(data, alloc_length);\n      if (!data) {\n         data = '\\0';\n         break;\n}\n      }\n       if (data[data_length - 1] == '\\n') {\n         data[data_length - 1] = '\\0';\n          data = realloc(data, data_length);\n      if (!data) {\n         data = '\\0';\n      }\n   } else {\n     data = realloc(data, data_length + 1);\n\n      if (!data) {\n         data = '\\0';\n      } else {\n         data[data_length] = '\\0';\n      }\n   }\n   return data;\n}\nchar* ltrim(char* str) {\n   if (!str) {\n      return '\\0';\n   }\n   if (!*str) {\n      return str;\n   }\n   while (*str != '\\0' && isspace(*str)) {\n      str++;\n   }\n   return str;\n}\nchar* rtrim(char* str) {\n   if (!str) {\n      return '\\0';\n   }\n   if (!*str) {\n      return str;\n   }\n   char* end = str + strlen(str) - 1;\n   while (end >= str && isspace(*end)) {\n      end--;\n   }      *(end + 1) = '\\0';\n   return str;\n}\nint parse_int(char* str) {\n   char* endptr;\n   int value = strtol(str, &endptr, 10);\n   if (endptr == str || *endptr != '\\0') {\n      exit(EXIT_FAILURE);\n   }\n      return value;\n}\nlong parse_long(char* str) {\n   char* endptr;long value = strtol(str, &endptr, 10);\n   if (endptr == str || *endptr != '\\0') {\n      exit(EXIT_FAILURE);\n}\n   return value;\n}`
  return cHead + cBody + cFooter
}

export const convertUserResponse = (return_type, user_response, language) => {
  let checkAns
  if (['integer', 'float', 'double', 'long-integer'].includes(return_type)) {
    checkAns = +user_response
  } else if (['string', 'char', 'boolean'].includes(return_type)) {
    checkAns = user_response
  } else if (
    [
      'integer-array',
      'float-array',
      'long-integer-array',
      'double-array',
    ].includes(return_type)
  ) {
    if (
      typeof user_response === 'string' ||
      language === 'node' ||
      language === 'c'
    ) {
      checkAns = user_response
    } else {
      checkAns = user_response.map((item) => +item).join('\n')
    }
  } else if (
    ['string-array', 'char-array', 'boolean-array'].includes(return_type)
  ) {
    if (
      typeof user_response === 'string' ||
      language === 'node' ||
      language === 'c'
    ) {
      checkAns = user_response
    } else {
      checkAns = user_response.join('\n')
    }
  } else if (
    [
      'integer-2d-array',
      'float-2d-array',
      'long-integer-2d-array',
      'double-2d-array',
    ].includes(return_type)
  ) {
    checkAns = ['node', 'java', 'c'].includes(language)
      ? user_response
      : user_response.join('\n')
  } else if (
    ['string-array', 'char-array', 'boolean-array'].includes(return_type)
  ) {
    checkAns =
      language === 'node' || language === 'c'
        ? user_response
        : user_response.join('\n')
  }
  return checkAns
}
