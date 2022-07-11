import React from 'react';
import {
  Form,
  Row,
  Col,
  InputNumber,
  Button,
  Modal,
  Typography,
  Divider,
} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
function AddRandomQuestion({ rmvRandomQues }) {
  const { t } = useTranslation('test', 'common');
  const [form] = Form.useForm();
  const onDelete = () => {
    Modal.confirm({
      title: `${t('do_you_want_to_remove_question_from_test', {
        ns: 'test',
      })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t('button.ok', { ns: 'common' })}`,
      cancelText: `${t('button.cancel', { ns: 'common' })}`,
      onOk: onOkDelete,
    });
  };
  const onOkDelete = () => {
    rmvRandomQues();
  };
  const onFinish = (values) => {};
  return (
    <div className='add-random-question'>
      <Row gutter={[24, 24]}>
        <Col md={10} span={24}>
          <Typography.Title level={3}>
            {t('random_question_setting', { ns: 'test' })}
          </Typography.Title>
          <Typography.Text>
            {t('random_questions_will_be_selected_from_your', { ns: 'test' })}
          </Typography.Text>
          <Divider />
          <Typography.Text strong>
            (số lượng random) question group name
          </Typography.Text>
        </Col>
        <Col md={14} span={24}>
          <Row align='middle' gutter={[24, 24]}>
            <Col span={18}>
              <Typography.Text strong>
                {t('select_the_number_of_random_question_for_each_tag', {
                  ns: 'test',
                })}
              </Typography.Text>
              <Typography.Paragraph style={{ fontSize: 10 }}>
                <Typography.Text strong>
                  {t('note', {
                    ns: 'test',
                  })}
                  :
                </Typography.Text>
                {t(
                  'the_number_of_question_for_each_tag_must_be_least_or_equal_the_total_question_of_theses_tag',
                  {
                    ns: 'test',
                  },
                )}
              </Typography.Paragraph>
            </Col>
            <Col span={6}>
              <Button
                icon={<DeleteOutlined />}
                type='link'
                style={{ color: 'red' }}
                onClick={onDelete}
              >
                {t('button.delete', {
                  ns: 'common',
                })}
              </Button>
            </Col>
            <Col span={24}>
              <Form
                name='random'
                layout='vertical'
                form={form}
                onFinish={onFinish}
              >
                <div
                  style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  {['name 1', 'name 2', 'name 3', 'name 4'].map(
                    (quesGroup, index) => (
                      <div key={index}>
                        <Row align='start' gutter={[8, 8]}>
                          <Col>
                            <Form.Item
                              style={{ fontWeight: '500' }}
                              name={`questionGroupId${index}`}
                            >
                              <InputNumber min={0} max={3}></InputNumber>
                            </Form.Item>
                          </Col>
                          <Col>
                            <Typography.Text strong>
                              question group {quesGroup}
                            </Typography.Text>
                            <Typography.Paragraph>
                              {t('total', {
                                ns: 'test',
                              })}{' '}
                              {index}
                            </Typography.Paragraph>
                          </Col>
                        </Row>
                        <Divider />
                      </div>
                    ),
                  )}
                </div>
                <Button
                  type='primary'
                  className='btn-primary'
                  size='large'
                  htmlType='submit'
                  style={{ marginTop: 12 }}
                >
                  {t('button.update', {
                    ns: 'common',
                  })}
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddRandomQuestion;
