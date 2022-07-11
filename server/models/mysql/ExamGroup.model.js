import sql from './db.js';

class ExamGroup {
  constructor(user_id, name) {
    this.user_id = user_id;
    this.name = name;
  }

  static create(newExamGroup, result) {
    sql.query('INSERT INTO ExamGroups SET ?', newExamGroup, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      //console.log("created ExamGroups: ", res);
      result(null, { id: res.insertId, ...newExamGroup });
    });
  }

  static getAll(name, page, result) {
    //Need userid
    let count = 'SELECT COUNT(*) as totalRow FROM ExamGroups';
    let subQuery = 'SELECT * FROM ExamGroups';
    if (name) {
      const filter = ` Where name REGEXP '${name}' `;
      count += filter;
      subQuery += filter;
    }
    subQuery += ' ORDER BY id DESC';

    const rowPerPage = 15;
    if (page) {
      let skip = (page - 1) * rowPerPage;
      let limit = ` LIMIT ${skip},${rowPerPage}`;
      subQuery += limit;
    }
    let query = `SELECT eg.id as ExamGroups_id, eg.name as ExamGroups_name, seg.id as Sub_id, seg.name as Sub_name 
    FROM (${subQuery}) eg 
    LEFT JOIN SubExamGroups seg 
      ON eg.id = seg.ExamGroups_id`;

    sql.query(count, (err, count) => {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
        return;
      }

      sql.query(query, (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(null, err);
          return;
        }

        let data = [];
        for (const subExam in res) {
          if (parseInt(subExam) === 0 && res[0].Sub_id)
            data.push({
              id: res[0].ExamGroups_id,
              name: res[0].ExamGroups_name,
              child: [{ id: res[0].Sub_id, name: res[0].Sub_name }],
            });
          else if (parseInt(subExam) === 0 && !res[0].Sub_id)
            data.push({
              id: res[0].ExamGroups_id,
              name: res[0].ExamGroups_name,
              child: [],
            });
          else if (
            res[subExam].ExamGroups_id === res[subExam - 1].ExamGroups_id
          ) {
            data[data.length - 1].child.push({
              id: res[subExam].Sub_id,
              name: res[subExam].Sub_name,
            });
          } else if (!res[subExam].Sub_id) {
            data.push({
              id: res[subExam].ExamGroups_id,
              name: res[subExam].ExamGroups_name,
              child: [],
            });
          } else
            data.push({
              id: res[subExam].ExamGroups_id,
              name: res[subExam].ExamGroups_name,
              child: [
                {
                  id: res[subExam].Sub_id,
                  name: res[subExam].Sub_name,
                },
              ],
            });
        }
        result(null, {
          data,
          pagination: {
            page,
            rowPerPage,
            totalRows: count[0].totalRow,
          },
        });
      });
    });
  }

  static updateById(id, name, result) {
    //Need userid to verify
    sql.query(
      'UPDATE ExamGroups SET name = ?, updated_at = NOW() WHERE  id = ?',
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

        //console.log("updated ExamGroup: ", res);
        result(null, { id: id });
      }
    );
  }

  static remove(id, result) {
    //Need userid to verify
    sql.query('DELETE FROM ExamGroups WHERE id = ?', id, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
      if (!res.affectedRows) return result({ error: 'Not Found' }, null);

      //console.log("deleted ExamGroups with id: ", id);
      result(null, res);
    });
  }
}

export default ExamGroup;
