import sql from './db.js';

class SubExamGroup {
  constructor(name, ExamGroups_id) {
    this.name = name;
    this.ExamGroups_id = ExamGroups_id;
  }

  static getByExamGroupId(examGroupId) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM SubExamGroups WHERE ExamGroups_id = ${examGroupId}`;
      sql.query(query, (err, res) => {
        if (err) {
          //console.log(err);
          return reject(null);
        }
        resolve(res);
      });
    });
  }

  static create(subExamGroup, result) {
    sql.query('INSERT INTO SubExamGroups SET ?', subExamGroup, (err, res) => {
      if (err) {
        //console.log(err);
        return result(err, null);
      }
      result(null, { id: res.insertId, ...subExamGroup });
    });
  }

  static createMany(children, result) {
    let query = 'INSERT INTO SubExamGroups(name,ExamGroups_id) VALUES';
    children.forEach((child, index) => {
      if (index < children.length - 1)
        query += `("${child.name}",${child.ExamGroups_id}),`;
      else query += `("${child.name}",${child.ExamGroups_id})`;
    });
    sql.query(query, (err, res) => {
      if (err) {
        console.log(err);
        return result(err, null);
      }
      result(null, {
        success: true,
      });
    });
  }

  static updateById(id, name, result) {
    sql.query(
      'UPDATE SubExamGroups SET name = ?, updated_at = NOW() WHERE  id = ?',
      [name, id],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ error: 'not_found' }, null);
          return;
        }

        //console.log("updated SubExamGroups: ", res);
        result(null, { id: id });
      }
    );
  }

  static remove(id, result) {
    sql.query('DELETE FROM SubExamGroups WHERE id = ?', id, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }

      //console.log("deleted SubExamGroups with id: ", id);
      result(null, res);
    });
  }
  static move(id, newGroupId, result) {
    sql.query(
      'UPDATE SubExamGroups SET ExamGroups_id = ?, updated_at = NOW() WHERE  id = ?',
      [newGroupId, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ error: 'not_found' }, null);
          return;
        }

        console.log('updated SubExamGroups: ', res);
        result(null, { success: true });
      }
    );
  }
}

export default SubExamGroup;
