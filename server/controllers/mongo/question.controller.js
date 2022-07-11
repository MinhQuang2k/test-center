import question from '../../models/mongo/question.model.js'
import db from '../../database/models/index.js'
import * as generate from '../../utils/generateCode.js'
import {
  _testCodePhp,
  _testCodeJava,
  _testCodeNode,
  _testCodePython,
  _testCodeC,
  codePathPython,
  codePathPhp,
  codePathNode,
  codePathJava,
  codePathC,
} from '../test_case/testCase.controller.js'
import fs from 'fs'
import path from 'path'
// import { performance } from 'perf_hooks'//https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute

export const testCode = async (req, res) => {
  let code = req.body.code.replace(/\\n/g, '\n')
  code = code.replace(/\\0/g, '0')
  code = code.replace(/\'\\\n\'/g, "'\\n'")
  code = code.replace(/\\\"/g, '"')
  code = code.replace(/\"\\\n\"/g, `"\\n"`)
  const language = req.body.language
  let result = []
  if (language === 'python') {
    fs.writeFileSync(path.join(codePathPython, 'user_solution.py'), code)
  } else if (language === 'php') {
    fs.writeFileSync(path.join(codePathPhp, 'user_solution.php'), code)
  } else if (language === 'node') {
    fs.writeFileSync(path.join(codePathNode, 'user_solution.js'), code)
  } else if (language === 'java') {
    fs.writeFileSync(path.join(codePathJava, 'user_solution.java'), code)
  } else if (language === 'c') {
    fs.writeFileSync(path.join(codePathC, 'user_solution.c'), code)
  }

  const ques = await question.findById(req.params.id)
  for (let index = 0; index < ques.test_case.length; index++) {
    const input = ques.test_case[index].input

    try {
      let user_code_response
      if (language === 'python') {
        user_code_response = await _testCodePython({
          pythonOptions: ['-u'],
          scriptPath: codePathPython,
          args: [input],
        })
      } else if (language === 'php') {
        user_code_response = await _testCodePhp(input)
      } else if (language === 'node') {
        user_code_response = await _testCodeNode(input)
      } else if (language === 'java') {
        user_code_response = await _testCodeJava(input)
      } else if (language === 'c') {
        user_code_response = await _testCodeC(input)
      }
      console.log('user_code_response', JSON.stringify(user_code_response))
      const checkAns = generate.convertUserResponse(
        ques.code_stubs[0].return_type,
        user_code_response,
        language
      )
      const return_obj = {
        input: input,
        output: checkAns,
        expected_output: ques.test_case[index].output,
        name: ques.test_case.name,
      }
      if (checkAns === ques.test_case[index].output) {
        result.push({ ...return_obj, correct: true })
      } else {
        result.push({ ...return_obj, correct: false })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }
  return res.status(200).json({ result: result })
}

//receice :
// nếu có gửi sectionId thì thêm sectionId này vào bảng questionTests
export const create = async (req, res) => {
  const { content, questionTypeId, questionGroupID } = req.body
  if (!content || !questionTypeId || !questionGroupID) {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  try {
    let data
    if (req.body.sectionId) {
      const createdQt = await db.Section.findOne({
        where: { id: req.body.sectionId },
      })
      if (createdQt) {
        data = await question.create({ ...req.body })
      } else {
        delete req.body.sectionId
        data = await question.create({ ...req.body })
      }
      if (data._id) {
        await db.QuestionTest.create({
          sectionId: req.body.sectionId,
          questionId: data._id.toString(),
        })
      }
    } else {
      data = await question.create({ ...req.body })
    }
    return res.status(201).json({ data })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const getAll = async (req, res) => {
  let { content, questionGroupID } = req.query
  console.log(req)
  let { page } = req.query
  const rowPerPage = 15
  if (page < 0 || !page) {
    page = 1
  }
  if (!content) {
    content = ''
  }
  const skip = (+page - 1) * rowPerPage
  const count = await question.count({})
  if (!count) {
    return res.status(404).json({ message: 'empty' })
  }
  const questions = questionGroupID
    ? await question
        .find({
          content: { $regex: content },
          questionGroupID: questionGroupID,
        })
        .skip(skip)
        .limit(rowPerPage)
    : await question
        .find({
          content: { $regex: content },
        })
        .skip(skip)
        .limit(rowPerPage)
  if (questions) {
    const pagination = {
      totalRows: count,
      rowPerPage,
      page: +page,
    }
    return res.status(200).json({ questions, pagination })
  } else {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getById = async (req, res) => {
  const data = await question.findById(req.params.id)
  if (data) {
    return res.status(200).json({ question: data })
  } else {
    return res
      .status(404)
      .json({ message: `Not found question with id: ${req.params.id}` })
  }
}

export const updateById = async (req, res) => {
  const { content, score } = req.body
  if (!content || !score) {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields' })
  }
  try {
    const updateQuestion = await question.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
    return res.status(200).json({ question: updateQuestion })
  } catch (error) {
    return res.status(404).json({ message: error })
  }
}

export const deleteById = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const data = await question.findById(req.params.id)
    if (data) {
      try {
        await db.QuestionTest.destroy({
          where: {
            questionId: req.params.id,
          },
        })
        await question.deleteOne({ _id: req.params.id })
        return res
          .status(200)
          .json({ message: 'deleted success', deletedId: req.params.id })
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
    }
  }
  return res
    .status(404)
    .json({ message: `Not found question with id: ${req.params.id}` })
}
