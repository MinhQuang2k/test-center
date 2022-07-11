import sql from './db.js';

class QuestionGroup {
  constructor(name) {
    this.name = name;
  }

  static create(newQuestionGroup, result) {
    sql.query(
      'INSERT INTO questionGroups SET ?',
      newQuestionGroup,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, { id: res.insertId, ...newQuestionGroup });
      }
    );
  }

  static getAll(page = 1, keyword, result) {
    let count = 'SELECT COUNT(*) as numRows FROM questionGroups';
    let query = 'SELECT * FROM questionGroups';

    if (keyword) {
      const filter = ` Where name REGEXP '${keyword}'`;
      count += filter;
      query += filter;
    }
    const rowPerPage = 15;
    let skip = (page - 1) * rowPerPage;
    let limit = ` LIMIT ${skip},${rowPerPage}`;
    query += limit;

    sql.query(count, (err, count) => {
      if (err) {
        result(null, err);
        return;
      }
      sql.query(query, (err, res) => {
        if (err) {
          result(null, err);
          return;
        }
        result(null, {
          data: res,
          pagination: {
            currentPage: +page,
            rowPerPage,
            totalRows: count[0].numRows,
          },
        });
      });
    });
  }

  static updateById(id, name, result) {
    sql.query(
      'UPDATE questionGroups SET name = ? WHERE  id = ?',
      [name, id],
      (err, res) => {
        if (err) {
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: 'not_found' }, null);
          return;
        }

        result(null, { id: id });
      }
    );
  }

  static deleteById(id, result) {
    sql.query('DELETE FROM questionGroups WHERE id = ?', id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  }
}

export default QuestionGroup;
