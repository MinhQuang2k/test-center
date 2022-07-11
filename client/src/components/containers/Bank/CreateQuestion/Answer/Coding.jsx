import {
  CloudUploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Editor from "@monaco-editor/react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeLanguage } from '../../../../../utils/utils';
import Code from '../../../../commons/Code';

function Coding(props) {
  const { t } = useTranslation('bank');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [createTestCase, setCreateTestCase] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setCreateTestCase(e.target.value);
  };

  return (
    <>
      <Col span={24}>
        <div className='white_bg pd_20'>
          <Row gutter={[16, 16]}>
            <Col flex={1}>
              <h6>{t('Create_test_case', { ns: 'bank' })}</h6>
            </Col>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                {t('Download_file_example', { ns: 'bank' })}
              </Button>
            </Upload>

            <Col>
              <Button icon={<PlusOutlined />} onClick={showModal}>
                {t('Create', { ns: 'bank' })}
              </Button>
              <Modal
                title='Tạo test case'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                maskClosable={false}
              >
                <Row justify='end'>
                  <Col>
                    <Radio.Group onChange={onChange} value={createTestCase}>
                      <Radio value={1}>{t('Create', { ns: 'bank' })}</Radio>
                      <Radio value={2}>
                        {t('Upload_file', { ns: 'bank' })}
                      </Radio>
                    </Radio.Group>
                  </Col>
                  <Col span={24}>
                    <Form
                      initialValues={{ name: 'Testcase 1' }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete='off'
                      layout='vertical'
                    >
                      <Form.Item label={t('Name', { ns: 'bank' })} name='name'>
                        <Input />
                      </Form.Item>

                      <Form.Item label='Input' name='input'>
                        {createTestCase === 2 ? (
                          <Upload {...props}>
                            <Input
                              addonAfter='Browse'
                              placeholder='Choose input file'
                            />
                          </Upload>
                        ) : (
                          <Input.TextArea rows={4} />
                        )}
                      </Form.Item>

                      <Form.Item label='Output' name='output'>
                        {createTestCase === 2 ? (
                          <>
                            <Upload {...props}>
                              <Input
                                addonAfter='Browse'
                                placeholder='Choose output file'
                              />
                            </Upload>
                            {t('2MB', { ns: 'bank' })}
                          </>
                        ) : (
                          <Input.TextArea rows={4} />
                        )}
                      </Form.Item>

                      <Form.Item name='hidden_test_case'>
                        <Checkbox>
                          {t('Hidden_test_case', { ns: 'bank' })}
                        </Checkbox>
                      </Form.Item>

                      <Form.Item name='hidden_test_case'>
                        <Row justify='end' gutter={[8, 8]}>
                          <Col>
                            <Button onClick={handleCancel}>
                              {t('Cancel', { ns: 'bank' })}
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              type='primary'
                              htmlType='submit'
                              onClick={handleOk}
                            >
                              {t('Add', { ns: 'bank' })}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Modal>
            </Col>
            <Col span={24}>
              <table>
                <tbody>
                  <tr>
                    <th>Testcase</th>
                    <th>Input</th>
                    <th>Output</th>
                    <th>{t('Actions', { ns: 'bank' })}</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>test 2</td>
                    <td>5</td>
                    <td>test 2</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>test 2</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={24}>
              <Upload.Dragger {...props}>
                <p className='ant-upload-drag-icon'>
                  <CloudUploadOutlined />
                </p>
                <p className='ant-upload-text'>
                  {t('Drop_file_here_to_upload', { ns: 'bank' })}
                </p>
                <p className='ant-upload-hint'>
                  {t('Maximum_file_size', { ns: 'bank' })} <b>50MB</b>
                </p>
              </Upload.Dragger>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={24}>
        <div className='white_bg pd_20'>
          <Row>
            <Col span={24}>
              <h6>{t('Code_stub', { ns: 'bank' })}</h6>
            </Col>
            <Col span={24}>
              <Form layout='vertical' initialValues={{}}>
                <Form.Item
                  label={t('Function_name', { ns: 'bank' })}
                  name='FunctionName'
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={t('Return_type', { ns: 'bank' })}
                  name='ReturnType'
                >
                  <Select
                    showSearch
                    placeholder={t('Question_bank', { ns: 'bank' })}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    defaultValue='1'
                  >
                    <Select.Option value='1'>String</Select.Option>
                    <Select.Option value='2'>Integer</Select.Option>
                    <Select.Option value='3'>Float</Select.Option>
                    <Select.Option value='4'>Boolean</Select.Option>
                    <Select.Option value='5'>Double</Select.Option>
                    <Select.Option value='6'>Character</Select.Option>
                    <Select.Option value='7'>Integer Array</Select.Option>
                    <Select.Option value='8'>String Array</Select.Option>
                    <Select.Option value='9'>Long Integer Array</Select.Option>
                    <Select.Option value='10'>Float Array</Select.Option>
                    <Select.Option value='11'>Double Array</Select.Option>
                    <Select.Option value='12'>Character Array</Select.Option>
                    <Select.Option value='13'>Boolean Array</Select.Option>
                    <Select.Option value='14'>Integer 2D Array</Select.Option>
                    <Select.Option value='15'>String 2D Array</Select.Option>
                    <Select.Option value='16'>
                      Long Integer 2D Array
                    </Select.Option>
                    <Select.Option value='17'>Float 2D Array</Select.Option>
                    <Select.Option value='19'>Double 2D Array</Select.Option>
                    <Select.Option value='20'>Character 2D Array</Select.Option>
                    <Select.Option value='21'>Boolean 2D Array</Select.Option>
                    <Select.Option value='22'>Void</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={t('Function_parameters', { ns: 'bank' })}
                >
                  <Form.List name='FunctionParameters'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} align='start'>
                            <Form.Item {...restField} name={name}>
                              <Row gutter={[8, 8]}>
                                <Col span={8}>
                                  <Select
                                    showSearch
                                    placeholder={`choose type ...`}
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                      option.items.includes(input)
                                    }
                                    defaultValue='1'
                                  >
                                    <Select.Option value='1'>String</Select.Option>
                                    <Select.Option value='2'>Integer</Select.Option>
                                    <Select.Option value='3'>Float</Select.Option>
                                    <Select.Option value='4'>Boolean</Select.Option>
                                    <Select.Option value='5'>Double</Select.Option>
                                    <Select.Option value='6'>Character</Select.Option>
                                    <Select.Option value='7'>Integer Array</Select.Option>
                                    <Select.Option value='8'>String Array</Select.Option>
                                    <Select.Option value='9'>Long Integer Array</Select.Option>
                                    <Select.Option value='10'>Float Array</Select.Option>
                                    <Select.Option value='11'>Double Array</Select.Option>
                                    <Select.Option value='12'>Character Array</Select.Option>
                                    <Select.Option value='13'>Boolean Array</Select.Option>
                                    <Select.Option value='14'>Integer 2D Array</Select.Option>
                                    <Select.Option value='15'>String 2D Array</Select.Option>
                                    <Select.Option value='16'>
                                      Long Integer 2D Array
                                    </Select.Option>
                                    <Select.Option value='17'>Float 2D Array</Select.Option>
                                    <Select.Option value='19'>Double 2D Array</Select.Option>
                                    <Select.Option value='20'>Character 2D Array</Select.Option>
                                    <Select.Option value='21'>Boolean 2D Array</Select.Option>
                                    <Select.Option value='22'>Void</Select.Option>
                                  </Select>
                                </Col>
                                <Col span={16}>
                                  <Input />
                                </Col>
                              </Row>
                            </Form.Item>
                            <DeleteOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button onClick={() => add()}>
                            <PlusOutlined />{' '}
                            {t('Add_parameter', { ns: 'bank' })}
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      {t('Generate_code', { ns: 'bank' })}
                    </Button>
                  </Form.Item>
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Code />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default Coding;
