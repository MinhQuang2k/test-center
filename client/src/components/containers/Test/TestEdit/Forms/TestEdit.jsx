import { Form, Button, TreeSelect, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { testSelector, updateInfo } from '../../../../../slices/test';
import { examSelector } from '../../../../../slices/examGroup';

const { TreeNode } = TreeSelect;
function TestEdit({ closeModal }) {
  const { t } = useTranslation('test');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { test } = useSelector(testSelector);
  const { exams } = useSelector(examSelector);

  const onFinish = (values) => {
    if (!values.description) delete values.description;
    dispatch(updateInfo({ ...values, id: test.id }));
    form.resetFields();
    closeModal();
  };
  return (
    <Form name='test' form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item
        style={{ fontWeight: '500' }}
        name='name'
        label={t('test_name', { ns: 'test' })}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
        initialValue={test.name}
      >
        <Input placeholder={t('your_input_here', { ns: 'test' })} />
      </Form.Item>
      <Form.Item
        style={{ fontWeight: '500' }}
        name='subExamGroupId'
        label={t('category', { ns: 'test' })}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
        initialValue={test.SubExamGroup.id}
      >
        <TreeSelect
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
          placeholder={t('choose_an_category', { ns: 'test' })}
          treeDefaultExpandAll
        >
          {exams.map((exam) => (
            <TreeNode
              value={exam.id + exam.name}
              title={exam.name}
              selectable={false}
              key={exam.id + exam.name}
            >
              {exam.child?.map((subExam) => (
                <TreeNode
                  value={subExam.id}
                  title={subExam.name}
                  key={subExam.id}
                ></TreeNode>
              ))}
            </TreeNode>
          ))}
        </TreeSelect>
      </Form.Item>
      <Form.Item
        name='description'
        label={t('description', { ns: 'test' })}
        style={{ fontWeight: '500' }}
      >
        <Input.TextArea rows={4} maxLength={100}></Input.TextArea>
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

export default TestEdit;
