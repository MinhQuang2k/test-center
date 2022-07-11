import SubExamGroup from '../../models/mysql/SubExamGroup.model.js';

export const create = (req, res) => {
  const { examGroupId, name } = req.body;
  if (!name || !examGroupId || name.trim() === '')
    return res.status(404).send({ error: 'Invalid request' });

  const subExamGroup = new SubExamGroup(name, examGroupId);
  SubExamGroup.create(subExamGroup, (err, result) => {
    if (err) {
      if (err.errno === 1062)
        return res.status(400).send({
          error: 'Sub category group name has already been taken',
        });
      return res.status(500).send({
        error: err,
      });
    }
    res.status(201).send({ subExamGroup: result });
  });
};

export const updateById = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (name === '' || !name)
    return res.status(400).send({
      error: 'Name can not be empty!',
    });
  SubExamGroup.updateById(id, name, (err, data) => {
    if (err) {
      if (err.errno === 1062)
        return res.status(400).send({
          error: 'Sub category group name has already been taken',
        });
      return res.status(500).send({
        message: 'Error updating SubExamGroup with id ' + req.params.id,
      });
    }
    res.send(data);
  });
};

export const remove = (req, res) => {
  SubExamGroup.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.errno === 1451)
        return res
          .status(400)
          .send({
            message:
              'Can not delete sub category because sub catgories are not empty',
          });
      return res.status(500).send({
        message: 'Could not delete SubExamGroup with id ' + req.params.id,
      });
    }
    res.send({ message: `SubExamGroup was deleted successfully!` });
  });
};

export const move = (req, res) => {
  const { newExamGroupsId } = req.body;
  const parsed = Number(newExamGroupsId);
  const { id } = req.params;
  if (isNaN(parsed))
    return res.status(400).send({
      error: 'Invalid request',
    });
  SubExamGroup.move(id, parsed, (err, data) => {
    if (err) {
      if (err.errno === 1062)
        return res.status(400).send({
          error: 'Sub category group name has already been taken',
        });
      return res.status(500).send({
        message: 'Error updating SubExamGroup with id ' + req.params.id,
      });
    }
    res.send(data);
  });
};
