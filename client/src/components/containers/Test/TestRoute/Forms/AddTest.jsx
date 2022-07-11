import {
  Form,
  Row,
  Col,
  TreeSelect,
  Select,
  Radio,
  Input,
  Space,
  Button,
} from 'antd';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTest,
  resetTest,
  testSelector,
} from '../../../../../slices/test';
import { useNavigate } from 'react-router-dom';
import { examSelector } from '../../../../../slices/examGroup';
const { TreeNode } = TreeSelect;
function AddTest({ closeModal }) {
  const { t } = useTranslation('test', 'common');
  const [form] = Form.useForm();
  const { exams } = useSelector(examSelector);
  const { test } = useSelector(testSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  useEffect(() => {
    if (test) {
      navigate(`/tests/${test.id}/edit`);
    }
    return () => dispatch(resetTest());
  }, [test]);
  const onFinish = (values) => {
    if (!values.description) delete values.description;
    console.log(values);
    dispatch(createTest(values));
    form.resetFields();
    closeModal();
  };

  return (
    <Form name='tests' form={form} layout='vertical' onFinish={onFinish}>
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
      >
        <Input placeholder={t('your_input_here', { ns: 'test' })} />
      </Form.Item>

      <Row gutter={8}>
        <Col span={16}>
          <Form.Item
            label={t('category', { ns: 'test' })}
            style={{ fontWeight: '500' }}
            name='subExamGroupId'
            rules={[
              {
                required: true,
                message: `${t('this_is_required_information', { ns: 'test' })}`,
              },
            ]}
          >
            <TreeSelect
              style={{ width: '100%' }}
              value={category}
              dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
              placeholder={t('choose_an_category', { ns: 'test' })}
              treeDefaultExpandAll
              onChange={(value) => setCategory(value)}
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
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('language_setting', { ns: 'test' })}
            style={{ fontWeight: '500' }}
            name='language'
            rules={[
              {
                required: true,
                message: `${t('this_is_required_information', { ns: 'test' })}`,
              },
            ]}
            initialValue='Tiếng Anh'
          >
            <Select placeholder={t('choose_an_category', { ns: 'test' })}>
              <Select.Option value='VN'>Tiếng Việt</Select.Option>
              <Select.Option value='EN'>Tiếng Anh</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={t('type_of_test', { ns: 'test' })}
        name='has_multi_section'
        style={{ fontWeight: '500' }}
        rules={[
          {
            required: true,
            message: `${t('this_is_required_information', { ns: 'test' })}`,
          },
        ]}
      >
        <Radio.Group>
          <Space direction='vertical'>
            <Radio value={0}>{t('none_sections', { ns: 'test' })}</Radio>
            <Radio value={1}>{t('sections', { ns: 'test' })}</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name='description'
        label={t('description', { ns: 'test' })}
        style={{ fontWeight: '500' }}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className='form-footer'>
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

export default AddTest;
