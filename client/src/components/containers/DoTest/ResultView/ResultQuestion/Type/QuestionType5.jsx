import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import CodeSql from '../../../../../commons/CodeSql';
import TestCase from '../../../ExamQuestions/Question/TestCase';

function QuestionType5({ data }) {
  return (
    <div>
      <span className='question_order'>CÂU HỎI {data.index}</span>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div
            style={{ marginBottom: '10px' }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Row justify='end' gutter={[16, 16]}>
            <Col span={24}>
              <CodeSql isReadOnly={true} />
            </Col>
            <Col span={24}>
              <div
                className='test_case pd_20'
                style={{
                  boxShadow:
                    '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                }}
              >
                <Tabs tabPosition='left'>
                  <Tabs.TabPane
                    tab={
                      <span className='icon-success'>
                        <CheckCircleOutlined />
                        Testcase 1
                      </span>
                    }
                    key='1'
                  >
                    <TestCase />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <span className='icon-success'>
                        <CheckCircleOutlined />
                        Testcase 1
                      </span>
                    }
                    key='2'
                  >
                    <TestCase />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <span className='icon-error'>
                        <CloseCircleOutlined />
                        Testcase 1
                      </span>
                    }
                    key='3'
                  >
                    <TestCase />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default QuestionType5;
