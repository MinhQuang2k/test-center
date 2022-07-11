import { Button, Col, Row } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Xarrow from 'react-xarrows';
import { sortAnswers } from '../../../../../../utils/question';

function QuestionType6({ data, answers }) {
  const [showArrow, setShowArrow] = useState(false);

  const showIconResult = (questionID) => {
    const dataCorrect = [...data.matching_correct_answers[questionID]].sort();
    const dataAnswer = [...answers[questionID]].sort();
    if (dataCorrect.length != dataAnswer.length)
      return <CloseCircleFilled className='icon-error' />;
    for (let i = 0; i < dataCorrect.length; i++) {
      if (dataCorrect[i] != dataAnswer[i])
        return <CloseCircleFilled className='icon-error' />;
    }
    return <CheckCircleFilled className='icon-success' />;
  };

  useEffect(() => {
    setShowArrow(true);
  }, []);

  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]} className='questionMatching'>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Row>
            <Col className='questions' span={12}>
              {data?.matching_answers?.questions &&
                data?.matching_answers?.questions.map((question) => (
                  <div className='box-questions' key={question.id}>
                    <div className='questions-item'>
                      <div className='item-questions'>
                        <span>
                          <strong>{question.id}.</strong>
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: question.content,
                          }}
                        ></span>
                      </div>
                      <div className='question-item-circle'>
                        <div
                          id={`${data.index}o${question.id}`}
                          className='icon-circle'
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            <Col className='answers' span={12}>
              {data?.matching_answers?.answers &&
                data?.matching_answers?.answers
                  .sort(sortAnswers)
                  .map((answer) => (
                    <div className='box-answers' key={answer.id}>
                      <div className='answers-item'>
                        <div className='answers-item-circle'>
                          <div
                            id={`${data.index}%${answer.id}`}
                            className='icon-circle'
                          ></div>
                        </div>
                        <div className='item-answers'>
                          <span>
                            <strong>{answer.id.toUpperCase()}.</strong>
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: answer.content,
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Col>
          </Row>
          {data.matching_answers.questions.map((question) => (
            <div key={question.id}>
              {answers[question.id].length > 0 &&
                answers[question.id].map((answer) => (
                  <Xarrow
                    key={`${question.id}*${answer}`}
                    start={`${data.index}o${question.id}`}
                    end={`${data.index}%${answer}`}
                    path='straight'
                    strokeWidth={2}
                    headSize={4}
                    color='#2c4a9f'
                    showHead={showArrow}
                  />
                ))}
            </div>
          ))}
          <div className='mb-1'>
            <strong>Trả lời</strong>
          </div>
          <div className='list-answer'>
            {data?.matching_answers?.questions &&
              data?.matching_answers?.questions.map((question) => (
                <div className='box-answer' key={question.id}>
                  <div className='icon-answer'>
                    {showIconResult(question.id)}
                  </div>
                  <div className='order-answer'>
                    <strong>{question.id}.</strong>
                  </div>
                  <div>
                    {data?.matching_answers?.answers &&
                      data?.matching_answers?.answers
                        .sort(sortAnswers)
                        .map((answer) => (
                          <Button
                            type='primary'
                            ghost
                            className={
                              answers[question.id].includes(answer.id)
                                ? 'btn-outline btn-answer active'
                                : 'btn-outline btn-answer'
                            }
                            key={answer.id}
                          >
                            {answer.id.toUpperCase()}
                          </Button>
                        ))}
                  </div>
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionType6;
