import { Col, Divider, Input, Row } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

function QuestionType3({ data, answers }) {
  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          ></div>
          <div>
            <MessageOutlined className='text-success mr-1' />
            <span>{answers?.answer}</span>
          </div>
          <div className='box-alert mt-1'>
            <p>Chờ chấm điểm</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionType3;
