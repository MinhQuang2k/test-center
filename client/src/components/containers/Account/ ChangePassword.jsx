import { Button, Checkbox, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

function ChangePassword(props) {
  const { t } = useTranslation('account');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <h6>{t('Change_password', { ns: 'account' })}</h6>
      <Form layout='vertical' name='basic' onFinish={onFinish}>
        <Form.Item
          label={t('Current_password', { ns: 'account' })}
          name='Current_password'
          rules={[
            {
              required: true,
              message: t('This_is_a_required_field', { ns: 'account' }),
            },
          ]}
        >
          <Input.Password placeholder='input password' />
        </Form.Item>

        <Form.Item
          label={t('New_password', { ns: 'account' })}
          name='New_password'
          rules={[
            {
              required: true,
              message: t('This_is_a_required_field', { ns: 'account' }),
            },
          ]}
        >
          <Input.Password placeholder='input password' />
        </Form.Item>

        <Form.Item
          label={t('Password_confirm', { ns: 'account' })}
          name='Password_confirm'
          rules={[
            {
              required: true,
              message: t('This_is_a_required_field', { ns: 'account' }),
            },
          ]}
        >
          <Input.Password placeholder='input password' />
        </Form.Item>

        <Form.Item
          name='Logout_all_devices'
          rules={[
            {
              required: true,
              message: t('This_is_a_required_field', { ns: 'account' }),
            },
          ]}
        >
          <Checkbox>{t('Logout_all_devices', { ns: 'account' })}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {t('Update', { ns: 'account' })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;
