import { Col, Divider, Row, Button } from 'antd';
import { useState } from 'react';

function QuestionType7({ data }) {
  const [answers, setAnswers] = useState({});
  const handleChangeAnswer = (e) => {
    setAnswers((pre) => {
      let newAnswer = { ...pre, [e.target.id]: e.target.value };
      return newAnswer;
    });
  };

  const changeContent = (answers) => {
    let newContent = data?.content;
    for (let item of data?.fill_blank_correct_answers) {
      if (answers[item.key] && answers[item.key] !== '') {
        newContent = newContent.replace(
          `[%${item.key}%]`,
          `<strong>${answers[item.key]}</strong>`,
        );
      } else {
        newContent = newContent.replace(
          `[%${item.key}%]`,
          `<strong>__${item.key}__</strong>`,
        );
      }
    }
    return newContent;
  };

  return (
    <div>
      <span>
        CÂU HỎI {data.index}
        <small>(Chỉ chọn một đáp án)</small>
      </span>
      <Divider style={{ marginTop: '10px', marginBottom: '4px' }} />

      {/* {data.time_limit && data.time_limit > 0 ? (
        <HideQuestionType7 data={data} />
      ) : ( */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: changeContent(answers) }}
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
                    <div>
                      <input
                        type='text'
                        className='c-fill_input'
                        id={item.key}
                        onChange={handleChangeAnswer}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      {/* )} */}
    </div>
  );
}

function HideQuestionType7({ data }) {
  return (
    <div className='preview-question'>
      <Row gutter={[24, 24]} className='hide-question'>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            Lorem ipsum, dolor sit amet consectetur
            <br />
            adipisicing elit. Libero
            <br />
            facilis nemo quasi reprehenderit voluptates.
          </div>
          <div className='fill-blank__box'>
            <div>
              <strong className=''>Trả lời</strong>
            </div>
            <div className='c-box-answers'>
              {data?.fill_blank_correct_answers &&
                data?.fill_blank_correct_answers.map((item) => (
                  <div className='c-answers' key={item.key}>
                    <div className='c-answers-number'>{item.key}</div>
                    <div>
                      <input type='text' className='c-fill_input' />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      <div className='preview-box'>
        <div className='preview-title'>
          This question has a time limit to answer is 01:00:00, click start to
          view and answer the question
        </div>
        <div className='preview-btn'>
          <Button type='primary' ghost className='btn-outline'>
            Bắt đầu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionType7;
