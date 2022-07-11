import { Button, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { examSelector } from '../../../../slices/examGroup';
import { useTranslation } from 'react-i18next';

const { Option } = Select
function MoveTestGroup({
  onCancel,
  exam: currentExam,
  child,
  handelMoveExamChild,
}) {
  const { t } = useTranslation('category', 'common')
  const { exams } = useSelector(examSelector)
  const filterExams = exams.filter((exam) => exam.id !== currentExam.id) //remove current examGroup form the list
  const [form] = Form.useForm()
  useEffect(() => {
    return () => form.resetFields();
  });
  const onFinish = async (values) => {
    if (handelMoveExamChild) handelMoveExamChild(values);
    onCancel();
  };

  return (
    <Form
      name='complex-form'
      onFinish={onFinish}
      form={form}
      initialValues={{ currentGroup: currentExam.name }}
    >
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="currentGroup"
          label={t('current_category', { ns: 'category' })}
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="newGroup"
          label={t('move_to_category', { ns: 'category' })}
          rules={[
            { required: true, message: 'Please select an item in the list' },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            margin: '0 8px',
          }}
        >
          <Select placeholder='-- Chọn nhóm đề thi --'>
            {filterExams.map((exam) => (
              <Option value={exam.id} key={exam.id}>
                {exam.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
        <Button type="primary" htmlType="submit" className="btn-primary">
          {t('button.save', { ns: 'common' })}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default MoveTestGroup
