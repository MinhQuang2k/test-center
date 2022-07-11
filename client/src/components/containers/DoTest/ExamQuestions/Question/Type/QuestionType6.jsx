import { Button, Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import Xarrow from 'react-xarrows';
import { sortAnswers } from '../../../../../../utils/question';

function QuestionType6({ data }) {
  const [chooseAnswer, setChooseAnswer] = useState({});
  const handleChooseAnswer = (questionID, answerID) => {
    setChooseAnswer((pre) => {
      return {
        ...pre,
        [`${questionID}+${answerID}`]:
          !chooseAnswer[`${questionID}+${answerID}`],
      };
    });
  };

  useEffect(() => {
    const questions = [...data?.matching_answers?.questions];
    const answers = [...data?.matching_answers?.answers];
    for (let question of questions) {
      for (let answer of answers) {
        setChooseAnswer((pre) => {
          return { ...pre, [`${question.id}+${answer.id}`]: false };
        });
      }
    }
  }, []);

  return (
    <div>
      <span>
        CÂU HỎI {data.index}
        <small>(Chỉ chọn một đáp án)</small>
      </span>
      <Divider style={{ marginTop: '10px', marginBottom: '4px' }} />

      {/* {data.time_limit && data.time_limit > 0 ? (
        <HideQuestionType6 data={data} />
      ) : ( */}
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
                          id={`${data.index}-${question.id}`}
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
                            id={`${data.index}-${answer.id}`}
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
                        {data.matching_answers.questions.map((question) => (
                          <Xarrow
                            key={`${question.id}+${answer.id}`}
                            start={`${data.index}-${question.id}`}
                            end={`${data.index}-${answer.id}`}
                            path='straight'
                            strokeWidth={
                              chooseAnswer[`${question.id}+${answer.id}`]
                                ? 2
                                : 0
                            }
                            headSize={4}
                            color='#2c4a9f'
                            showHead={
                              chooseAnswer[`${question.id}+${answer.id}`]
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
            </Col>
          </Row>
          <div className='mb-1'>
            <strong>Trả lời</strong>
          </div>
          <div className='list-answer'>
            {data?.matching_answers?.questions &&
              data?.matching_answers?.questions.map((question) => (
                <div className='box-answer' key={question.id}>
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
                              chooseAnswer[`${question.id}+${answer.id}`]
                                ? 'btn-outline btn-answer active'
                                : 'btn-outline btn-answer'
                            }
                            key={answer.id}
                            onClick={() =>
                              handleChooseAnswer(question.id, answer.id)
                            }
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
      {/* )} */}
    </div>
  );
}

function HideQuestionType6({ data }) {
  return (
    <div className='preview-question'>
      <Row gutter={[24, 24]} className='questionMatching hide-question'>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            facilis nemo quasi reprehenderit voluptates.
          </div>
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
                        <span> Lorem ipsum, dolor sit amet</span>
                      </div>
                      <div className='question-item-circle'>
                        <div id={question.id} className='icon-circle'></div>
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
                          <div id={answer.id} className='icon-circle'></div>
                        </div>
                        <div className='item-answers'>
                          <span>
                            <strong>{answer.id.toUpperCase()}.</strong>
                          </span>
                          <span>Lorem ipsum, dolor sit amet consectetur</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </Col>
          </Row>
          <div className='mb-1'>
            <strong>Trả lời</strong>
          </div>
          <div className='list-answer'>
            {data?.matching_answers?.questions &&
              data?.matching_answers?.questions.map((question) => (
                <div className='box-answer' key={question.id}>
                  <div className='order-answer'>
                    <strong>{question.id}.</strong>
                  </div>
                  <div>
                    {data?.matching_answers?.answers &&
                      data?.matching_answers?.answers.map((answer) => (
                        <button className='btn-answer' key={answer.id}>
                          {answer.id.toUpperCase()}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
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

export default QuestionType6;
