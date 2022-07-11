import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function AccountInfo(props) {
  const { t } = useTranslation('account');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
          <h6>{t('Account_info', { ns: 'account' })}</h6>
        </Col>
        <Col>
          <Form
            layout='vertical'
            name='basic'
            initialValues={{}}
            onFinish={onFinish}
          >
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  label={t('Full_name', { ns: 'account' })}
                  name='Full_name'
                  rules={[
                    {
                      required: true,
                      message: t('This_is_a_required_field', { ns: 'account' }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t('Email', { ns: 'account' })}
                  name='Email'
                  rules={[
                    {
                      required: true,
                      message: t('This_is_a_required_field', { ns: 'account' }),
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t('Username', { ns: 'account' })}
                  name='Username'
                  rules={[
                    {
                      required: true,
                      message: t('This_is_a_required_field', { ns: 'account' }),
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={t('Phone', { ns: 'account' })}
                  name='Phone'
                  rules={[
                    {
                      required: true,
                      message: t('This_is_a_required_field', { ns: 'account' }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={t('Language', { ns: 'account' })}
                  name='Language'
                >
                  <Select defaultValue='1'>
                    <Select.Option value='1'>English</Select.Option>
                    <Select.Option value='2'>Vietnamese</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    {t('Update', { ns: 'account' })}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AccountInfo;
