import db from '../../database/models/index.js'
import question from '../../models/mongo/question.model.js'
import questionType from '../../models/mongo/questionType.model.js'

export const create = async (req, res) => {
  const { name, subExamGroupId, language, has_multi_section } = req.body
  if (
    (!name || name.trim() === '' || !subExamGroupId,
      !language ||
      language.trim() === '' ||
      ![0, 1].includes(parseInt(has_multi_section)))
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  const transaction = await db.sequelize.transaction()
  try {
    const test = await db.Test.create(
      {
        ...req.body,
      },
      { transaction: transaction }
    )
    if (test) {
      await db.Section.create(
        {
          testId: test.id,
          name: 'Câu hỏi phần 1',
        },
        { transaction: transaction }
      )
      transaction.commit()
      return res.status(201).json({ test })
    }
  } catch (error) {
    transaction.rollback()
    return res.status(500).json({ message: error })
  }
}

export const getById = async (req, res) => {
  const test = await db.Test.findOne({
    include: [
      {
        model: db.Section,
        include: [
          {
            model: db.QuestionTest,
            attributes: [],
          },
        ],
      },
      {
        model: db.SubExamGroup,
      },
    ],
    attributes: {
      include: [
        [
          db.sequelize.literal(
            '(SELECT COUNT(*) FROM Sections,questionTests where Test.id = Sections.testId and Sections.id = questionTests.sectionId)'
          ),
          'totalQuestions',
        ],
      ],
    },
    where: {
      id: req.params.id,
    },
  })
  if (test) {
    const data = JSON.parse(JSON.stringify(test))
    const sections = data.Sections
    const questions = await Promise.all(
      sections.map(async (section) => {
        const ques = await question
          .find({ sectionId: section.id })
          .populate(['questionTypeId'])
        return JSON.parse(JSON.stringify(ques))
      })
    )
    const section_question = sections.map((section, index) => {
      section.totalScore = questions[index].reduce((prev, cur) => {
        return prev + cur.score
      }, 0)
      section.questions = questions[index]
      return section
    })
    const totalScore = section_question.reduce((prev, cur) => {
      return prev + cur.totalScore
    }, 0)
    data.totalScore = totalScore
    data.Sections = section_question
    return res.status(200).json({ data })
  } else {
    return res
      .status(404)
      .json({ message: `Not found test with id ${req.params.id}` })
  }
}

export const getAll = async (req, res) => {
  const sort_by_type = req.query.sort_by === 'recent' ? 'desc' : 'asc'
  const sort_by = req.query.sort_by === 'recent' ? 'updatedAt' : 'name'
  const { subExamGroupId, page, test_types } = req.query
  const test_type = Array.isArray(test_types) ? test_types : [test_types]
  if (page < 0) page = 1
  const rowPerPage = 10
  const skip = (+page - 1) * rowPerPage
  const { count, rows } = await db.Test.findAndCountAll({
    distinct: true,
    include: [
      {
        model: db.SubExamGroup,
      },
      {
        model: db.Examination,
      },
      {
        model: db.Section,
        include: [
          {
            model: db.QuestionTest,
            attributes: [],
          },
        ],
      },
    ],
    attributes: {
      include: [
        [
          db.sequelize.literal(
            '(SELECT COUNT(*) FROM Examinations where testId=Test.id)'
          ),
          'totalExams',
        ],
        [
          db.sequelize.literal(
            '(SELECT COUNT(*) FROM Sections,questionTests where Test.id = Sections.testId and Sections.id = questionTests.sectionId)'
          ),
          'totalQuestions',
        ],
      ],
    },
    where: {
      test_type: {
        [db.Sequelize.Op.in]: test_type,
      },
      name: {
        [db.Sequelize.Op.substring]: req.query.keyword,
      },
      subExamGroupId: {
        [!subExamGroupId ? db.Sequelize.Op.substring : db.Sequelize.Op.eq]:
          subExamGroupId,
      },
    },
    order: [[sort_by, sort_by_type]],
    offset: skip,
    limit: rowPerPage,
  })
  if (count) {
    const pagination = {
      totalRows: count,
      rowPerPage,
      page: +page,
    }
    // tìm ra các sectionId cho hết vào 1 array
    // query trong question vs các sectionId đó
    // sum ra tổng điểm , lưu vào test đó
    const data = JSON.parse(JSON.stringify(rows))
    const sectionId = data.map((item) => {
      const sectionId = item.Sections.map((section) => {
        return section.id
      })
      return sectionId
    })
    const questions = await Promise.all(
      sectionId.map(async (section) => {
        const ques = await question.find({ sectionId: { $in: section } })
        return JSON.parse(JSON.stringify(ques))
      })
    )
    const section_score = questions.map((question) => {
      return question.reduce((prev, cur) => {
        return prev + cur.score
      }, 0)
    })
    const newData = data.map((item, index) => {
      return { ...item, totalScore: section_score[index] }
    })
    return res.status(200).json({ tests: newData, pagination })
  } else {
    return res.status(404).json({ message: 'empty' })
  }
}

export const updateInfo = async (req, res) => {
  const { name, subExamGroupId } = req.body
  if (!name || name.trim() === '' || !subExamGroupId) {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  try {
    const result = await db.Test.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if (result[0]) {
      return res.status(200).json({ test: { ...req.body } })
    } else {
      return res.status(404).json({
        message: `Not found test with id ${req.params.id}`,
      })
    }
  } catch {
    return res.status(500).json({
      message: `Error update info test with id ${req.params.id}`,
    })
  }
}

export const updateConfig = async (req, res) => {
  const {
    is_all_question_shown,
    language,
    is_question_shuffled,
    audio_type,
    duration,
  } = req.body
  if (
    ![0, 1].includes(parseInt(is_all_question_shown)) ||
    !language ||
    language.trim() === '' ||
    ![0, 1].includes(parseInt(is_question_shuffled)) ||
    ![0, 1].includes(parseInt(audio_type)) ||
    (!duration && duration !== 0)
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  try {
    const result = await db.Test.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if (result[0]) {
      return res.status(200).json({ test: { ...req.body } })
    } else {
      return res.status(404).json({
        message: `Not found test with id ${req.params.id}`,
      })
    }
  } catch {
    return res.status(500).json({
      message: `Error update config test with id ${req.params.id}`,
    })
  }
}

export const deleteById = async (req, res) => {
  try {
    const result = await db.Test.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (result) {
      return res.status(200).json({
        message: `deleted test with id ${req.params.id}`,
        deletedId: req.params.id,
      })
    } else {
      return res.status(404).json({
        message: `Not found test with id ${req.params.id}`,
      })
    }
  } catch (error) {
    return res.status(400).json({
      message: `This test with id ${req.params.id} has examinations `,
    })
  }
}
