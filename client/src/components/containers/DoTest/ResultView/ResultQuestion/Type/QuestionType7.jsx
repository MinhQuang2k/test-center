import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';

function QuestionType7({ data, answers }) {
  const changeContent = () => {
    let newContent = data?.content;
    for (let item of data?.fill_blank_correct_answers) {
      newContent = newContent.replace(
        `[%${item.key}%]`,
        `<strong>__${item.key}__</strong>`,
      );
    }
    return newContent;
  };

  const showIconResult = (correct, examinee) => {
    if (correct == examinee) {
      return <CheckCircleFilled className='icon-success mr-1' />;
    }

    return <CloseCircleFilled className='icon-error mr-1' />;
  };

  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: changeContent(data.content) }}
          ></div>
          <div className='fill-blank__box'>
            <div>
              <strong className=''>Trả lời</strong>
            </div>
            <div className='c-box-answers'>
              {data?.fill_blank_correct_answers &&
                data?.fill_blank_correct_answers.map((item) => (
                  <div className='c-answers' key={item.key}>
                    <div className='c-answers-number'>{item.key}</div>
                    <div className='c-answer-box'>
                      <input
                        type='text'
                        className='c-fill_input'
                        id={item.key}
                        defaultValue={answers[item.key - 1]}
                        readOnly='readonly'
                      />
                      {showIconResult(item.content[0], answers[item.key - 1])}
                      <p>
                        Đáp án: <span>{item.content[0]}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      {data.note_answer && (
        <Col>
          <div>
            <strong>Giải thích đáp án</strong>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.note_answer }}></div>
        </Col>
      )}
    </div>
  );
}

export default QuestionType7;
