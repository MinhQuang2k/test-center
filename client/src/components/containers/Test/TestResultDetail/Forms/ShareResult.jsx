import {
  Form,
  Checkbox,
  Radio,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Space,
} from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ShareResult({ closeModal }) {
  const { t } = useTranslation('test', 'common');
  const [form] = Form.useForm();
  useEffect(() => {
    return form.resetFields();
  });
  const onFinish = (values) => {
    closeModal();
  };
  return (
    <Form
      name="shareResult"
      layout="horizontal"
      onFinish={onFinish}
      form={form}
      className="send-mail"
    >
      <Row>
        <Col md={12} span={24}>
          <Typography.Title level={5}>
            1. {t('share_by_link', { ns: 'test' })}
          </Typography.Title>
          <Row align="middle" justify="center" gutter={[8, 8]}>
            <Col span={24}>
              <Typography.Text type="secondary" style={{ marginLeft: '60px' }}>
                {t('QR_VIEW_TEST_RESULT', { ns: 'test' })}
              </Typography.Text>
              <div
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: 'black',
                  margin: 'auto',
                }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col md={12} span={24}>
          <Typography.Title level={5}>
            2. {t('send_result_via_emails', { ns: 'test' })}
          </Typography.Title>
          <Form.Item
            name="receiver"
            initialValue="user"
            label={t('receiver', { ns: 'test' })}
            style={{ fontWeight: '500' }}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="user">
                  {t('send_result_to_examinee_email', { ns: 'test' })}
                </Radio>
                <Radio value="another">
                  {t('send_to_other_emails', { ns: 'test' })}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="address"
            initialValue="company"
            label={t('from', { ns: 'test' })}
            style={{ fontWeight: '500' }}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="company">Netko Solution</Radio>
                <Radio value="another">
                  {t('other_emails', { ns: 'test' })}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="score"
            label={t('score', { ns: 'test' })}
            style={{ fontWeight: '500' }}
            initialValue={['byScore', 'byPercent']}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="byScore">
                  {t('score', { ns: 'test' })}
                </Checkbox>
                <Checkbox value="byPercent">
                  {t('completion_percentage', { ns: 'test' })}
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="result"
            label={t('result', { ns: 'test' })}
            style={{ fontWeight: '500' }}
            initialValue={['passOrNot', 'showAns']}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="passOrNot">
                  {t('pass/Fail', { ns: 'test' })}
                </Checkbox>
                <Checkbox value="showAns">
                  {t('display_answers_correct/incorrect', { ns: 'test' })}
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="title"
            label={t('subject', { ns: 'test' })}
            style={{ fontWeight: '500' }}
          >
            <Input />
          </Form.Item>
          <Form.Item className="form-footer ">
            <Button
              type="default"
              htmlType="button"
              className="btn-gray"
              onClick={closeModal}
            >
              {t('button.cancel', { ns: 'common' })}
            </Button>
            <Button type="primary" htmlType="submit" className="btn-primary">
              {t('button.save', { ns: 'common' })}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ShareResult;
