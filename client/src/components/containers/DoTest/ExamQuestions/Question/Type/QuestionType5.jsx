import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Tabs } from 'antd';
import CodeSql from '../../../../../commons/CodeSql';
import TestCase from '../TestCase';

function QuestionType5({ data }) {
  return (
    <div>
      <span>
        CÂU HỎI {data.index}
        <small>(Chỉ chọn một đáp án)</small>
      </span>
      <Divider style={{ marginTop: '10px', marginBottom: '4px' }} />
      {/* {data.time_limit && data.time_limit > 0 ? (
        <HideQuestionType5 />
      ) : ( */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Row justify='end' gutter={[16, 16]}>
            <Col span={24}>
              <CodeSql />
            </Col>
            <Col>
              <Button>
                <CaretRightOutlined /> Chạy code
              </Button>
            </Col>
            <Col>
              <div
                className='test_case pd_20'
                style={{
                  boxShadow:
                    '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                }}
              >
                <Tabs tabPosition='left'>
                  <Tabs.TabPane tab='Testcase 1' key='1'>
                    <TestCase />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Testcase 2' key='2'>
                    <TestCase />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Testcase 3' key='3'>
                    <TestCase />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* )} */}
    </div>
  );
}

function HideQuestionType5() {
  return (
    <div className='preview-question'>
      <Row gutter={[24, 24]} className='hide-question'>
        <Col span={24}>
          <div style={{ marginBottom: '10px' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            facilis nemo quasi reprehenderit voluptates.
          </div>
          <Row justify='end' gutter={[16, 16]}>
            <Col span={24}>
              <CodeSql />
            </Col>
            <Col>
              <Button>
                <CaretRightOutlined /> Chạy code
              </Button>
            </Col>
          </Row>
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
export default QuestionType5;
