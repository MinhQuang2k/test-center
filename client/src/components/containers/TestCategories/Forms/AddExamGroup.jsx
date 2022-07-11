import { Form, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function AddExamGroup({ onCancel, handleAddExamGroup }) {
  const { t } = useTranslation('category', 'common');
  const [form] = Form.useForm();
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = async (values) => {
    if (handleAddExamGroup) handleAddExamGroup(values);
    onCancel();
  };
  return (
    <Form
      name='testCategoryForm'
      form={form}
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label={t('category_name', { ns: 'category' })}
        rules={[
          {
            required: true,
            message: `${t('the_category_name_field_is_required', {
              ns: 'category',
            })}`,
          },
        ]}
      >
        <Input placeholder={t('your_input_here', { ns: 'category' })} />
      </Form.Item>
      <Form.List name='child'>
        {(fields, { add }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                style={{ fontWeight: '500' }}
                label={
                  index === 0
                    ? `${t('sub_category_name1', { ns: 'category' })}`
                    : ''
                }
                key={field.key}
              >
                <Form.Item {...field} noStyle>
                  <Input
                    placeholder={t('your_input_here', { ns: 'category' })}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type='primary'
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
                className='btn-primary-inverse'
              >
                {t('new_sub_category1', { ns: 'category' })}
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
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

export default AddExamGroup;
