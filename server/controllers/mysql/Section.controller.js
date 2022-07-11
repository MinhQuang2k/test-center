import db from '../../database/models/index.js'
import question from '../../models/mongo/question.model.js'

export const create = async (req, res) => {
  const { testId, name } = req.body
  if (!testId || !name || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  const section = await db.Section.create({ ...req.body })
  if (section) {
    const data = JSON.parse(JSON.stringify(section))
    data.totalScore = 0
    data.questions = []
    return res.status(201).json({ section: data, message: 'created' })
  } else {
    return res.status(500).json({ message: 'Some thing went wrong' })
  }
}

export const updateById = async (req, res) => {
  const { name } = req.body
  if (!name || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Please fill in all the required fields.' })
  }
  try {
    const result = await db.Section.update(
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
      return res
        .status(200)
        .json({ section: { id: req.params.id, ...req.body } })
    } else {
      return res.status(404).json({
        message: `Not found section with id ${req.params.id}`,
      })
    }
  } catch {
    return res.status(500).json({
      message: `Error update info section with id ${req.params.id}`,
    })
  }
}
// để tất cả các question trong section bị xóa là null,
// questiontests xóa hết các bản ghi có SECTIONID
export const deleteById = async (req, res) => {
  const transaction = await db.sequelize.transaction()
  try {
    await db.QuestionTest.destroy(
      {
        where: {
          sectionId: req.params.id,
        },
      },
      { transaction: transaction }
    )
    await db.Section.destroy(
      {
        where: {
          id: req.params.id,
        },
      },
      { transaction: transaction }
    )
    await question.updateMany(
      { sectionId: req.params.id },
      {
        $set: {
          sectionId: null,
        },
      }
    )
    transaction.commit()
    return res.status(200).json({
      message: `deleted section with id ${req.params.id}`,
      deletedId: req.params.id,
      message: 'deleted',
    })
  } catch (error) {
    transaction.rollback()
    return res
      .status(500)
      .json({ message: `Error delete section test with id ${req.params.id}` })
  }
}
