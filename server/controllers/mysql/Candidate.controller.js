import db from "../../database/models/index.js";
import Result from "../../models/mongo/result.model.js";
import ResultDetail from "../../models/mongo/resultDetail.model.js";

export const deleleCandidates = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({
      where: { id: id },
      include: db.Role,
    });

    if (!user) {
      res.status(404).json({ success: false, message: "Id user not found" });
      return;
    }
    if (user?.Role?.name !== "candidate") {
      res.status(403).json({ success: false, messgae: "Error delete user" });
      return;
    }
    const results = await Result.find({ userID: id });

    await ResultDetail.deleteMany({
      resultID: { $in: results.map((result) => result._id) },
    });

    await db.ResultTimeline.destroy({
      where: { resultID: results.map((result) => result._id.toString()) },
    });

    await Result.deleteMany({ userID: id });

    await db.User.destroy({ where: { id: id } });

    res.status(200).json({ success: true, message: "Delete user id" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
