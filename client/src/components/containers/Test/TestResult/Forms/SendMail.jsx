import { Form, Checkbox, Radio, Input, Typography, Space, Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
function SendMail({ closeModal }) {
  const { t } = useTranslation('test', 'common');
  const [form] = Form.useForm();
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = (values) => {
    closeModal();
  };
  return (
    <Form
      name='sendEMail'
      form={form}
      layout='horizontal'
      onFinish={onFinish}
      className='send-mail'
    >
      <Typography.Title level={5}>
        1.{' '}
        {t(
          'select_the_email_sending_receiving_address_and_the_section_you_want_to_display',
          { ns: 'test' },
        )}
      </Typography.Title>
      <Form.Item
        name='score'
        label={t('score', { ns: 'test' })}
        style={{ fontWeight: '500' }}
        initialValue={['byScore', 'byPercent']}
      >
        <Checkbox.Group>
          <Space direction='vertical'>
            <Checkbox value='byScore'>{t('score', { ns: 'test' })}</Checkbox>
            <Checkbox value='byPercent'>
              {t('completion_percentage', { ns: 'test' })}
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name='result'
        label={t('result', { ns: 'test' })}
        style={{ fontWeight: '500' }}
        initialValue={['passOrNot', 'showAns']}
      >
        <Checkbox.Group>
          <Space direction='vertical'>
            <Checkbox value='passOrNot'>
              {t('pass/Fail', { ns: 'test' })}
            </Checkbox>
            <Checkbox value='showAns'>
              {t('display_answers_correct/incorrect', { ns: 'test' })}
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name='sendTo'
        label={t('receiver', { ns: 'test' })}
        style={{ fontWeight: '500' }}
      >
        <Radio.Group>
          <Space direction='vertical'>
            <Radio value='all'>{t('send_to_all', { ns: 'test' })}</Radio>
            <Radio value='other'>
              {t('only_send_those_who_have_not_been_sent', { ns: 'test' })} ( 0
              )
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Typography.Title level={5}>
        2. {t('select_mail_detail_&_when_to_send', { ns: 'test' })}
      </Typography.Title>
      <Form.Item
        name='receiver'
        label={t('from', { ns: 'test' })}
        style={{ fontWeight: '500' }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='title'
        label={t('subject', { ns: 'test' })}
        style={{ fontWeight: '500' }}
      >
        <Input />
      </Form.Item>
      <Form.Item className='form-footer '>
        <Button
          type='default'
          htmlType='button'
          className='btn-gray'
          onClick={closeModal}
        >
          {t('button.cancel', { ns: 'common' })}
        </Button>
        <Button type='primary' htmlType='submit' className='btn-primary'>
          {t('button.save', { ns: 'common' })}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SendMail;
