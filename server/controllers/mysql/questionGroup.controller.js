import db from "../../database/models/index.js"
import { Op } from "sequelize"
import Question from "../../models/mongo/question.model.js"

export const create = async (req, res) => {
  const { name } = req.body
  if (!name || name.trim() === "")
    return res.status(404).json({ success: false, message: "Invalid request" })
  try {
    const uniqueName = await db.QuestionGroup.findAll({
      where: {
        name: name.trim(),
      },
    })
    if (uniqueName.length > 0) {
      res.status(403).json({
        success: false,
        message: "The Tag name has already been taken",
        errorUnique: true,
      });
      return
    }

    const newQuestionGroup = await db.QuestionGroup.create({
      name: name.trim(),
    })

    res.status(201).json({ success: true, data: newQuestionGroup })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export const getAll = async (req, res) => {
  let { page, per_page, keyword, name } = req.query

  if (page < 0 || !page) page = 1
  if (per_page < 0 || !per_page) per_page = 15
  const skip = (page - 1) * per_page

  try {
    const { count, rows } = await db.QuestionGroup.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${keyword || ""}%`,
        },
      },
      offset: Number(skip),
      limit: Number(per_page),
      order: [["id", "DESC"]],
    })

    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    }
    res.status(200).json({ success: true, data: rows, pagination })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

export const updateById = async (req, res) => {
  const { name } = req.body
  const { id } = req.params
  if (name === "" || !name || name.trim() === "")
    return res
      .status(404)
      .json({ success: false, message: "Name can not be empty!" })
  if (!id)
    return res.status(404).json({ success: false, messgae: "Id not found" })

  try {
    const uniqueName = await db.QuestionGroup.findAll({
      where: {
        name: name.trim(),
      },
    })
    if (uniqueName.length > 0) {
      res.status(403).json({
        success: false,
        message: "The Tag name has already been taken",
        errorUnique: true,
      })
      return
    }

    const questionGroup = await db.QuestionGroup.update(
      { name: name.trim() },
      {
        where: {
          id: id,
        },
      }
    )
    if (questionGroup[0] <= 0)
      return res.status(404).json({ success: false, messgae: "Id not found" })

    res.status(200).json({
      success: true,
      message: "Question group was update successfully by id = " + id,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  if (!id)
    return res.status(404).json({ success: false, messgae: "Id not found" })
  try {
    const questionGroups = await db.QuestionGroup.findOne({
      where: {
        id: id,
      },
    })
    if (!questionGroups)
      return res.status(404).json({ success: false, messgae: "Id not found" })

    await Question.updateMany(
      { questionGroupID: id },
      { $set: { questionGroupID: null } }
    )
    await db.QuestionGroup.destroy({
      where: {
        id: id,
      },
    })
    res.status(200).json({
      success: true,
      message: "Question group was deleted successfully!",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}
