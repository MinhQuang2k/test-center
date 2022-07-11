import ExamGroup from '../../models/mysql/ExamGroup.model.js';
import SubExamGroup from '../../models/mysql/SubExamGroup.model.js';

export const create = (req, res) => {
  const { userId, name, child } = req.body;
  if (!name || name.trim() === '')
    return res.status(404).send({ error: 'Invalid request' });

  const examGroup = new ExamGroup(1, name); //replace 1 with userId
  ExamGroup.create(examGroup, (err, result) => {
    if (err) {
      if (err.errno === 1062)
        return res.status(400).send({
          message: 'The Category name has already been taken',
        });

      return res.status(500).send({
        message: 'Internal server error',
      });
    }
    if (!child || child.length <= 0)
      return res.status(201).send({ success: true, examGroup: result });
    else {
      const subExams = child.map(
        (subExam) => new SubExamGroup(subExam.name, result.id)
      );
      SubExamGroup.createMany(subExams, (err, result) => {
        if (err)
          return res.status(500).send({
            messsage: "Can't create child exam",
          });
        return res.status(201).send({ success: true });
      });
    }
  });
};

export const getAll = (req, res) => {
  const name = req.query.name;
  const page = Number(req.query.page);
  ExamGroup.getAll(name, page, async (err, data) => {
    if (err)
      return res.status(500).send({
        error: err.message || 'Some error occurred while retrieving ExamGroup.',
      });
    res.send({ ...data });
  });
};

export const updateById = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (name.trim() === '' || !name)
    return res.status(400).send({
      error: 'Name can not be empty!',
    });
  ExamGroup.updateById(id, name, (err, data) => {
    if (err) {
      if (err.errno === 1062)
        return res.status(400).send({
          message: 'The Category name has already been taken',
        });
      return res.status(500).send({
        message: 'Error updating ExamGroup with id ' + req.params.id,
      });
    }
    res.send(data);
  });
};

export const remove = (req, res) => {
  ExamGroup.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.errno === 1451)
        return res.status(400).send({
          message:
            'Can not delete category because sub categories are not empty',
        });
      return res.status(500).send({
        message: 'Could not delete ExamGroup with id ' + req.params.id,
        error: err,
      });
    }
    res.send({ message: `ExamGroup was deleted successfully!` });
  });
};
