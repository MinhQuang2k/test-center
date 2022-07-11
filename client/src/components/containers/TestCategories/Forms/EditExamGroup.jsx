import { Form, Button, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

function EditExamGroup({ onCancel, exam, handleEditExamGroup }) {
  const { t } = useTranslation('category', 'common');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = async (values) => {
    if (handleEditExamGroup) handleEditExamGroup(values);
    onCancel();
  };
  return (
    <Form
      name='testChildGroupForm'
      form={form}
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label={t('category_name', { ns: 'category' })}
        initialValue={exam.name}
        rules={[{
          required: true, message: `${t('the_category_name_field_is_required', {
            ns: 'category',
          })}`
        }]}
      >
        <Input placeholder={t('your_input_here', { ns: 'category' })} />
      </Form.Item>
      <Form.Item className='form-footer'>
        <Button
          type='default'
          htmlType='button'
          className='btn-gray'
          onClick={onCancel}
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

export default EditExamGroup;
