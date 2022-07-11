import { Col, Divider, Input, Row, Button } from 'antd';
import { useState } from 'react';

function QuestionType3({ data }) {
  const [answer, setAnswer] = useState();
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
        <HideQuestionType3 />
      ) : ( */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <Input.TextArea placeholder='Nhập câu trả lời của bạn...' rows={4} />
        </Col>
      </Row>
      {/* )} */}
    </div>
  );
}

function HideQuestionType3() {
  return (
    <div className='preview-question'>
      <Row gutter={[24, 24]} className='hide-question'>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            Labore, laboriosam. Harum voluptatem provident, atque, nam inventore
            quam, libero dolor dolorum repellat sed ducimus dolores!
          </div>
          <Input.TextArea placeholder='Nhập câu trả lời của bạn...' rows={4} />
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

export default QuestionType3;
