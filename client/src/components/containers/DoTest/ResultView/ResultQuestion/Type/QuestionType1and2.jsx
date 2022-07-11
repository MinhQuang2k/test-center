import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import { sortAnswers } from '../../../../../../utils/question';

function QuestionType1and2({ data, answers }) {
  const showIconResult = (answer) => {
    if (data.correct_answers.includes(answer.id)) {
      if (answers.includes(answer.id)) {
        return <CheckCircleFilled className='icon-success' />;
      }
      return <CheckCircleOutlined className='icon-success' />;
    }

    if (answers.includes(answer.id)) {
      return <CloseCircleOutlined className='icon-error' />;
    }
  };
  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            <strong
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            ></strong>
          </div>
          {data.answers &&
            data.answers.sort(sortAnswers).map((answer) => (
              <div className='flex-center' key={answer.id}>
                <div className='icon-answer'>{showIconResult(answer)}</div>
                <div style={{ marginRight: '4px', width: '15px' }}>
                  <b>
                    {answer.id}
                    {')'}
                  </b>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: answer.content,
                  }}
                ></div>
              </div>
            ))}
        </Col>
        {data.note_answer && (
          <Col>
            <div>
              <strong>Giải thích đáp án</strong>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.note_answer }}></div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default QuestionType1and2;
