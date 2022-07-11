import db from "../../database/models/index.js";
import Result from "../../models/mongo/result.model.js";
import {
  parseDuration,
  formatTime,
  typeApiCandidates,
  typeApiTests,
  typeApiTestCampains,
  typeApiTestResults,
  typeApiCampaignResult,
} from "../../utils/statistic.js";
import { Op } from "sequelize";

export const getCandidates = async (req, res) => {
  const userID = 17;
  let {
    page,
    per_page,
    fullname,
    identify_code,
    email,
    phone,
    position,
    group,
    type_filter,
  } = req.query;

  if (page < 0 || !page) page = 1;
  if (per_page < 0 || !per_page) per_page = 15;
  const skip = (page - 1) * per_page;

  try {
    const listExam = await db.Examination.findAll({
      include: [
        {
          model: db.Test,
          required: true,
          attributes: ["id", "name"],
          include: [
            {
              model: db.SubExamGroup,
              attributes: [],
              required: true,
              include: [
                {
                  model: db.ExamGroup,
                  required: true,
                  attributes: [],
                  where: {
                    user_id: userID,
                  },
                },
              ],
            },
          ],
        },
      ],
      attributes: ["id", "name"],
    });
    // find option group, position, identify_code by table result in mongodb
    const arrayOptionsMdb = [];

    if (group)
      arrayOptionsMdb.push({ group: { $regex: group.trim(), $options: "i" } });
    if (position)
      arrayOptionsMdb.push({
        job_position: { $regex: position.trim(), $options: "i" },
      });
    if (identify_code)
      arrayOptionsMdb.push({
        identify_code: { $regex: identify_code.trim(), $options: "i" },
      });

    const queryOptionMdb = {};

    if (type_filter && type_filter == 1 && arrayOptionsMdb.length > 0) {
      queryOptionMdb["$and"] = arrayOptionsMdb;
    }
    if ((!type_filter || type_filter == 2) && arrayOptionsMdb.length > 0) {
      queryOptionMdb["$or"] = arrayOptionsMdb;
    }
    queryOptionMdb.examinationsID = {
      $in: listExam.map((exam) => exam.id),
    };

    const resultsOptions = await Result.find(queryOptionMdb).sort("-createdAt");

    // find option fullname, email, phone by table user in mysql
    const arrayOptionsSQL = [];

    if (fullname)
      arrayOptionsSQL.push({
        fullname: {
          [Op.like]: `%${fullname}%`,
        },
      });

    if (email)
      arrayOptionsSQL.push({
        email: {
          [Op.like]: `%${email}%`,
        },
      });
    if (phone)
      arrayOptionsSQL.push({
        phoneNumber: {
          [Op.like]: `%${phone}%`,
        },
      });

    let listUserID = [];
    if (
      arrayOptionsSQL.length > 0 &&
      arrayOptionsMdb.length > 0 &&
      (!type_filter || type_filter == 2)
    ) {
      listUserID = await Result.find({
        examinationsID: {
          $in: listExam.map((exam) => exam.id),
        },
      }).sort("-createdAt");
    }

    let queryOptionSQL = {};

    if (arrayOptionsSQL.length > 0 && type_filter && type_filter == 1) {
      queryOptionSQL = {
        where: {
          [Op.and]: [
            { id: resultsOptions.map((result) => result.userID) },
            ...arrayOptionsSQL,
          ],
        },
      };
    } else if (
      arrayOptionsSQL.length > 0 &&
      arrayOptionsMdb.length > 0 &&
      (!type_filter || type_filter == 2)
    ) {
      queryOptionSQL = {
        where: {
          id: listUserID.map((user) => user.userID),
          [Op.or]: [
            { id: resultsOptions.map((result) => result.userID) },
            ...arrayOptionsSQL,
          ],
        },
      };
    } else if (
      arrayOptionsSQL.length > 0 &&
      (!type_filter || type_filter == 2)
    ) {
      queryOptionSQL = {
        where: {
          id: resultsOptions.map((user) => user.userID),
          [Op.or]: [...arrayOptionsSQL],
        },
      };
    } else {
      queryOptionSQL = {
        where: { id: resultsOptions.map((result) => result.userID) },
      };
    }

    const { count, rows } = await db.User.findAndCountAll({
      ...queryOptionSQL,
      attributes: ["id", "fullname", "email", "phoneNumber"],
      offset: Number(skip),
      limit: Number(per_page),
    });
    // statistic candidates
    const array = [];
    rows.forEach((user) => {
      let result = [];
      if (
        arrayOptionsSQL.length > 0 &&
        arrayOptionsMdb.length > 0 &&
        (!type_filter || type_filter == 2)
      ) {
        result = listUserID.find((r) => r.userID === user.id);
      } else {
        result = resultsOptions.find((r) => r.userID === user.id);
      }
      const testAndExam = listExam.find(
        (le) => le.id === result.examinationsID
      );
      const item = new typeApiCandidates({
        ...JSON.parse(JSON.stringify(user)),
        ...JSON.parse(JSON.stringify(result)),
        ...JSON.parse(JSON.stringify(testAndExam)),
      });
      array.push(item);
    });
    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    };
    res.status(200).json({
      success: true,
      candidates: array,
      pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getTests = async (req, res) => {
  const userID = 17;
  let { page, per_page } = req.query;

  if (page < 0 || !page) page = 1;
  if (per_page < 0 || !per_page) per_page = 15;
  const skip = (page - 1) * per_page;

  try {
    const { count, rows } = await db.Test.findAndCountAll({
      include: [
        {
          model: db.SubExamGroup,
          attributes: [],
          required: true,
          include: [
            {
              model: db.ExamGroup,
              required: true,
              attributes: [],
              where: {
                user_id: userID,
              },
            },
          ],
        },
      ],
      offset: Number(skip),
      limit: Number(per_page),
      order: [["updatedAt", "DESC"]],
    });

    const exams = await db.Examination.findAll({
      where: {
        testId: rows.map((test) => test.id),
      },
    });

    const results = await Result.find({
      examinationsID: {
        $in: exams.map((exam) => exam.id),
      },
    });

    // statistic test
    const array = [];
    rows.forEach((test) => {
      let average_completion_percent = 0;
      let average_score = 0;
      let average_completion_time = "00:00:00";
      let total_answer_sheet_completed = 0;
      let total_answer_sheet = 0;

      let totalPercentage = 0;
      let totalScore = 0;
      let totalDuration = 0;
      const examWithTest = exams.filter((exam) => exam.testId === test.id);
      examWithTest.forEach((exam) => {
        const resultAnswerSheet = results.filter(
          (r) => r.examinationsID === exam.id
        );
        const resultAnswerSheetCompleted = resultAnswerSheet.filter(
          (r) => r.endAt
        );
        total_answer_sheet += resultAnswerSheet.length;
        total_answer_sheet_completed += resultAnswerSheetCompleted.length;

        resultAnswerSheetCompleted.forEach((result) => {
          totalPercentage += Number(result?.complete_percent);
          totalScore += Number(result?.score);
          totalDuration += parseDuration(result?.time_do_test);
        });
      });

      if (total_answer_sheet > 0) {
        average_completion_percent =
          Math.round((totalPercentage / total_answer_sheet) * 100) / 100;
        average_score =
          Math.round((totalScore / total_answer_sheet) * 100) / 100;
      }

      if (total_answer_sheet_completed > 0)
        average_completion_time = formatTime(
          Math.round(totalDuration / total_answer_sheet_completed)
        );
      const item = new typeApiTests({
        ...test?.dataValues,
        average_completion_percent,
        average_score,
        average_completion_time,
        total_answer_sheet_completed,
        total_answer_sheet,
      });
      array.push(item);
    });

    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    };

    res.status(200).json({
      success: true,
      tests: array,
      pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getTestCampaigns = async (req, res) => {
  const userID = 17;
  let { page, per_page } = req.query;

  if (page < 0 || !page) page = 1;
  if (per_page < 0 || !per_page) per_page = 15;
  const skip = (page - 1) * per_page;

  try {
    const { count, rows } = await db.Examination.findAndCountAll({
      include: [
        {
          model: db.Test,
          required: true,
          attributes: [],
          include: [
            {
              model: db.SubExamGroup,
              attributes: [],
              required: true,
              include: [
                {
                  model: db.ExamGroup,
                  required: true,
                  attributes: [],
                  where: {
                    user_id: userID,
                  },
                },
              ],
            },
          ],
        },
      ],
      offset: Number(skip),
      limit: Number(per_page),
      order: [["id", "DESC"]],
    });
    const results = await Result.find({
      examinationsID: {
        $in: rows.map((exam) => exam.id),
      },
    });
    // statistic Test Campaigns
    const array = [];
    rows.forEach((exam) => {
      let average_completion_percent = 0;
      let average_score = 0;
      let average_completion_time = "00:00:00";
      let total_answer_sheet_completed = 0;
      let total_answer_sheet = 0;

      let totalPercentage = 0;
      let totalScore = 0;
      let totalDuration = 0;

      const resultAnswerSheet = results.filter(
        (r) => r.examinationsID === exam.id
      );
      const resultAnswerSheetCompleted = resultAnswerSheet.filter(
        (r) => r.endAt
      );
      total_answer_sheet += resultAnswerSheet.length;
      total_answer_sheet_completed += resultAnswerSheetCompleted.length;

      resultAnswerSheetCompleted.forEach((result) => {
        totalPercentage += Number(result.complete_percent);
        totalScore += Number(result.score);
        totalDuration += parseDuration(result.time_do_test);
      });

      if (total_answer_sheet > 0) {
        average_completion_percent =
          Math.round((totalPercentage / total_answer_sheet) * 100) / 100;
        average_score =
          Math.round((totalScore / total_answer_sheet) * 100) / 100;
      }

      if (total_answer_sheet_completed > 0)
        average_completion_time = formatTime(
          Math.round(totalDuration / total_answer_sheet_completed)
        );
      const item = new typeApiTestCampains({
        ...exam.dataValues,
        average_completion_percent,
        average_score,
        average_completion_time,
        total_answer_sheet_completed,
        total_answer_sheet,
      });
      array.push(item);
    });
    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    };
    res.status(200).json({ success: true, test_campaigns: array, pagination });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getTestResults = async (req, res) => {
  const userID = 17;
  const { id } = req.params;
  let { page, per_page, keyword, order_by } = req.query;

  if (page < 0 || !page) page = 1;
  if (per_page < 0 || !per_page) per_page = 15;
  const skip = (page - 1) * per_page;

  if (!id) {
    return res.status(404).json({ success: false, message: "Id not found" });
  }
  try {
    const tests = await db.Test.findOne({
      include: [
        {
          model: db.SubExamGroup,
          attributes: [],
          required: true,
          include: [
            {
              model: db.ExamGroup,
              required: true,
              attributes: [],
              where: {
                user_id: userID,
              },
            },
          ],
        },
        { model: db.Examination },
      ],
      where: {
        id: id,
      },
    });

    if (!tests) {
      return res.status(404).json({ success: false, message: "Id not found" });
    }

    let sortOrderBy = { createdAt: -1 };
    if (order_by === "highest_score")
      sortOrderBy = { isNullScore: -1, score: -1 };
    if (order_by === "latest") sortOrderBy = { createdAt: -1 };
    if (order_by === "lowest_score")
      sortOrderBy = { isNullScore: -1, score: 1 };

    const results = await Result.aggregate([
      {
        $match: {
          examinationsID: {
            $in: tests?.dataValues?.Examinations.map((exam) => exam.id),
          },
        },
      },
      {
        $addFields: {
          isNullScore: {
            $cond: { if: { $gte: ["$score", 0] }, then: 1, else: 0 },
          },
        },
      },
    ]).sort(sortOrderBy);

    const resultUserID = results.map((result) => result.userID);

    const queryOptionUser = {
      id: results.map((result) => result.userID),
    };
    if (keyword) {
      queryOptionUser.fullname = {
        [Op.like]: `%${keyword.trim()}%`,
      };
    }

    let orderMySql = [];
    if (resultUserID.length > 0)
      orderMySql = [
        [db.sequelize.fn("FIELD", db.sequelize.col("id"), ...resultUserID)],
      ];

    const { count, rows } = await db.User.findAndCountAll({
      where: {
        ...queryOptionUser,
      },
      offset: Number(skip),
      limit: Number(per_page),
      order: orderMySql,
    });

    const array = [];
    rows.forEach((user) => {
      const result = results.find((result) => result.userID === user.id);
      const item = new typeApiTestResults({
        ...JSON.parse(JSON.stringify(user)),
        ...JSON.parse(JSON.stringify(result)),
      });
      array.push(item);
    });

    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    };

    res.status(200).json({
      success: true,
      test_results: array,
      tests: { id: tests.id, name: tests.name },
      pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getTestCampaignResult = async (req, res) => {
  const userID = 17;
  const { id } = req.params;
  let {
    page,
    per_page,
    email,
    identify_code,
    fullname,
    phone,
    position,
    group,
    time,
    access_code,
    order_by,
  } = req.query;

  if (page < 0 || !page) page = 1;
  if (per_page < 0 || !per_page) per_page = 15;
  const skip = (page - 1) * per_page;

  if (!id) {
    res.status(404).json({ success: false, message: "Id not found" });
    return;
  }
  try {
    const examination = await db.Examination.findOne({
      include: [
        {
          model: db.Test,
          required: true,
          attributes: [],
          include: [
            {
              model: db.SubExamGroup,
              attributes: [],
              required: true,
              include: [
                {
                  model: db.ExamGroup,
                  required: true,
                  attributes: [],
                  where: {
                    user_id: userID,
                  },
                },
              ],
            },
          ],
        },
      ],
      where: {
        id: Number(id),
      },
    });

    if (!examination) {
      return res.status(404).json({ success: false, message: "Id not found" });
    }

    const queryOptionMdb = {
      examinationsID: Number(id),
    };

    if (group)
      queryOptionMdb.group = {
        $regex: group.trim(),
        $options: "i",
      };
    if (position)
      queryOptionMdb.job_position = {
        $regex: position.trim(),
        $options: "i",
      };
    if (identify_code)
      queryOptionMdb.identify_code = {
        $regex: identify_code.trim(),
        $options: "i",
      };

    if (access_code) {
      const accessExamCode = await db.AccessExamCode.findOne({
        where: { code: { [Op.like]: `%${access_code.trim()}%` } },
      });
      if (accessExamCode) queryOptionMdb.accesscodeID = accessExamCode.id;
    }
    if (time) {
      const arrayTime = time.split("-").map((element) => {
        if (typeof element === "string") {
          return element.trim();
        }
        return element;
      });

      queryOptionMdb.createdAt = {
        $gte: arrayTime[0].split(`/`).reverse().join("-"),
        $lte: arrayTime[1].split(`/`).reverse().join("-"),
      };
    }

    let sortOrderBy = { createdAt: -1 };
    if (order_by === "highest_score")
      sortOrderBy = { isNullScore: -1, score: -1 };
    if (order_by === "latest") sortOrderBy = { createdAt: -1 };
    if (order_by === "lowest_score")
      sortOrderBy = { isNullScore: -1, score: 1 };
    const results = await Result.aggregate([
      {
        $match: {
          ...queryOptionMdb,
        },
      },
      {
        $addFields: {
          isNullScore: {
            $cond: { if: { $gte: ["$score", 0] }, then: 1, else: 0 },
          },
        },
      },
    ]).sort(sortOrderBy);

    const resultUserID = results.map((result) => result.userID);

    const queryOptionSQL = {
      where: {
        id: resultUserID,
      },
    };
    if (fullname)
      queryOptionSQL.where.fullname = {
        [Op.like]: `%${fullname.trim()}%`,
      };
    if (email)
      queryOptionSQL.where.email = {
        [Op.like]: `%${email.trim()}%`,
      };
    if (phone)
      queryOptionSQL.where.phoneNumber = {
        [Op.like]: `%${phone.trim()}%`,
      };
    let orderMySql = [];
    if (resultUserID.length > 0)
      orderMySql = [
        [db.sequelize.fn("FIELD", db.sequelize.col("id"), ...resultUserID)],
      ];

    const { count, rows } = await db.User.findAndCountAll({
      ...queryOptionSQL,
      offset: Number(skip),
      limit: Number(per_page),
      order: orderMySql,
    });

    const array = [];

    rows.forEach((user) => {
      const result = results.find((result) => result.userID === user.id);
      const item = new typeApiCampaignResult({
        ...JSON.parse(JSON.stringify(user)),
        ...JSON.parse(JSON.stringify(result)),
      });
      array.push(item);
    });

    const resultTotal = await Result.aggregate([
      {
        $match: {
          examinationsID: Number(id),
        },
      },
      {
        $group: {
          _id: null,
          total_participants: { $sum: 1 },
          total_unfinished_participants: {
            $sum: {
              $subtract: [
                1,
                {
                  $cond: {
                    if: { $ne: ["$endAt", null] },
                    then: 1,
                    else: 0,
                  },
                },
              ],
            },
          },
          total_fail_question: { $sum: "$total_fail_question" },
          total_true_question: { $sum: "$total_true_question" },
          total_empty_answer_question: {
            $sum: {
              $subtract: [
                "$total_question",
                {
                  $add: ["$total_fail_question", "$total_true_question"],
                },
              ],
            },
          },
        },
      },
    ]);

    const pagination = {
      currentPage: Number(page),
      rowPerPage: Number(per_page),
      total: count,
    };

    res.status(200).json({
      success: true,
      result_statistic: {
        total_participants: resultTotal[0]?.total_participants || 0,
        total_unfinished_participants:
          resultTotal[0]?.total_unfinished_participants || 0,
      },
      question_statistic: {
        total_empty_answer_question:
          resultTotal[0]?.total_empty_answer_question || 0,
        total_fail_question: resultTotal[0]?.total_fail_question || 0,
        total_true_question: resultTotal[0]?.total_true_question || 0,
      },
      test_campaign_result: array,
      examination: { id: examination.id, name: examination.name },
      pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
