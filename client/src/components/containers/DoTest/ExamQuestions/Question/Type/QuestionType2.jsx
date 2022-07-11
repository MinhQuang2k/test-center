import { Col, Divider, Radio, Row, Space, Button, CountDown } from 'antd';
import { useState } from 'react';
import { sortAnswers } from '../../../../../../utils/question';

function QuestionType2({ data }) {
  const [answer, setAnswer] = useState();
  const [isCountDown, setCountDown] = useState(false);
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <span>
        CÂU HỎI {data.index}
        <small>(Chỉ chọn một đáp án)</small>
      </span>
      <Divider style={{ marginTop: '10px', marginBottom: '4px' }} />
      {/* {data.time_limit && data.time_limit > 0 ? (
        <>
          <HideQuestionType2 data={data} setCountDown={setCountDown} />
          {isCountDown && (
            <CountDown
              timeDate={Date.now() + 20 * 1000}
              renderTime={renderTime}
              onFinish={onFinish}
              time={time}
            />
          )}
        </>
      ) : ( */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Radio.Group style={{ marginLeft: '17px' }}>
            <Space direction='vertical'>
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Radio value={answer.id} key={answer.id}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '4px' }}>
                        <b>
                          {answer.id.toUpperCase()}
                          {')'}
                        </b>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: answer.content }}
                      ></div>
                    </div>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      {/* )} */}
    </div>
  );
}

function HideQuestionType2({ data, setCountDown }) {
  return (
    <div className='preview-question'>
      <Row gutter={[24, 24]} className='hide-question'>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            Labore, laboriosam. Harum voluptatem provident, atque, nam inventore
            quam, libero dolor dolorum repellat sed ducimus dolores!
          </div>
          <Radio.Group style={{ marginLeft: '17px' }}>
            <Space direction='vertical'>
              {data.answers &&
                data.answers.sort(sortAnswers).map((answer) => (
                  <Radio value={answer.id} key={answer.id}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '4px' }}>
                        <b>
                          {answer.id.toUpperCase()}
                          {')'}
                        </b>
                      </div>
                      <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Libero facilis nemo quasi reprehenderit
                        voluptates.
                      </div>
                    </div>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </Col>
      </Row>
      <div className='preview-box'>
        <div className='preview-title'>
          This question has a time limit to answer is 01:00:00, click start to
          view and answer the question
        </div>
        <div className='preview-btn'>
          <Button
            type='primary'
            ghost
            className='btn-outline'
            onClick={setCountDown}
          >
            Bắt đầu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionType2;
