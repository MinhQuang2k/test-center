import { Form, Button, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSection } from '../../../../../slices/section';
//type: add || update
function UpdateSection({ closeModal, section }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = (values) => {
    if (!values.description) delete values.description;
    values.id = section.id;
    dispatch(updateSection(values));
    closeModal();
  };
  return (
    <Form name='test' form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label='Tên phần'
        rules={[{ required: true, message: 'Đây là thông tin bắt buộc' }]}
        initialValue={section.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{ fontWeight: '500' }}
        name='descriptions'
        label='Mô tả'
        initialValue={section.description}
      >
        <Input.TextArea rows={4} maxLength={255} />
      </Form.Item>
      <Form.Item className='form-footer '>
        <Button
          type='default'
          htmlType='button'
          className='btn-gray'
          onClick={closeModal}
        >
          Hủy
        </Button>
        <Button type='primary' htmlType='submit' className='btn-primary'>
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateSection;
