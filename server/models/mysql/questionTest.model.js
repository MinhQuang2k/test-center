import sql from './db.js';

class QuestionTest {
  constructor(testID, questionID) {
    this.testID = testID;
    this.questionID = questionID;
  }

  static deleteManyByID(questionID, result) {
    sql.query(
      'DELETE FROM questionTest WHERE questionID = ?',
      questionID,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, res);
      }
    );
  }
}

export default QuestionTest;
