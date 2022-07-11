import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Required from '../../../../commons/Required';
import TinyMCE from '../../../../commons/TinyMCE';

let addRef;
let addRef2

function Matching(props) {
  const { t } = useTranslation('bank');
  useEffect(() => {
    addRef(); addRef()
    addRef2(); addRef2()
  }, [])
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function getLetter(num) {
    var letter = String.fromCharCode(num + 65);
    return letter;
  }

  const [row, setRow] = useState([
    { name: 0, key: 0, isListField: true, fieldKey: 0 },
    { name: 1, key: 1, isListField: true, fieldKey: 1 }
  ])

  const [col, setCol] = useState([
    { name: 0, key: 0, isListField: true, fieldKey: 0 },
    { name: 1, key: 1, isListField: true, fieldKey: 1 }
  ])

  return (
    <Col span={24}>
      <div className='white_bg pd_20'>
        <h6>
          {t('Enter_the_answer', { ns: 'bank' })} <Required />
        </h6>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row justify='space-around'>
              <Col>
                <b>{t('Column', { ns: 'bank' })} 1</b>
              </Col>
              <Col>
                <b>{t('Column', { ns: 'bank' })} 2</b>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Form
              name='basic'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.List name='answer'>
                {(fields, { add, remove }) => {
                  addRef = add;
                  return (
                    <>
                      <Radio.Group name='radiogroup' defaultValue={1}>
                        {fields.map(({ key, name, ...restField }) => {
                          if (row.length != fields.length && row.length > 0) {
                            setRow(fields)
                          }
                          return (
                            <Space key={key} align='start'>
                              <Form.Item
                                {...restField}
                                name={name}
                                label={name + 1}
                              >
                                <Row align='middle' gutter={[8, 8]} wrap={false}>
                                  <Col span={22}>
                                    <TinyMCE />
                                  </Col>
                                  <Col span={1}>
                                    <Button disabled={fields.length <= 2} type='link' onClick={() => { fields.length > 2 && remove(name) }}>
                                      <CloseCircleOutlined />
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Space>
                          )
                        })}
                      </Radio.Group>

                      <Form.Item>
                        <Col offset={2}>
                          <Button disabled={fields.length >= 10} onClick={() => { fields.length < 10 && add() }}>
                            <PlusOutlined /> {t('Add_answer', { ns: 'bank' })}
                          </Button>
                        </Col>
                      </Form.Item>

                    </>
                  )
                }}
              </Form.List>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              name='basic'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.List name='answer'>
                {(fields, { add, remove }) => {
                  addRef2 = add;
                  function clickAdd() {
                    fields.length < 10 && add()
                  }
                  return (
                    <>
                      <Radio.Group name='radiogroup' defaultValue={1}>
                        {fields.map(({ key, name, ...restField }) => {

                          if (col.length != fields.length && col.length > 0) {
                            setCol(fields)
                          }

                          const clickRemove = () => {
                            fields.length > 2 && remove(name)
                          }

                          return (
                            <Space key={key} align='start'>
                              <Form.Item
                                {...restField}
                                name={name}
                                label={getLetter(name)}
                              >
                                <Row align='middle' gutter={[8, 8]} wrap={false}>
                                  <Col span={22}>
                                    <TinyMCE />
                                  </Col>
                                  <Col span={1} >
                                    <Button disabled={fields.length <= 2} type='link' onClick={clickRemove}>
                                      <CloseCircleOutlined />
                                    </Button>

                                  </Col>
                                </Row>
                              </Form.Item>
                            </Space>
                          )
                        }
                        )}
                      </Radio.Group>

                      <Form.Item>
                        <Col offset={2}>
                          <Button disabled={fields.length >= 10} onClick={clickAdd}>
                            <PlusOutlined /> {t('Add_answer', { ns: 'bank' })}
                          </Button>
                        </Col>
                      </Form.Item>
                    </>
                  )
                }}
              </Form.List>
            </Form>
          </Col>
          <Col span={24}>
            <h6>{t('Choose_the_answer', { ns: 'bank' })}</h6>
            <p>{t('Please_choose', { ns: 'bank' })}</p>
            <br />
            <Row justify='center'>
              <Col>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      {col.map((val, index) => (<th key={index}>{getLetter(val.name)}</th>))}
                    </tr>

                    {row.map((val, index) => (
                      <tr key={index}>
                        <td>{val.name + 1}</td>
                        {col.map((value, index) => (<td key={index}><Checkbox /></td>))}
                      </tr>
                    ))}

                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Matching;
