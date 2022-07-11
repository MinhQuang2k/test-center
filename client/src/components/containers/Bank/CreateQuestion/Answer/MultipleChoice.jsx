import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Space, Checkbox, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import Required from '../../../../commons/Required';
import TinyMCE from '../../../../commons/TinyMCE';
import { useTranslation } from 'react-i18next';

let addRef;

function MultipleChoice(props) {
  const { t } = useTranslation('bank');
  useEffect(() => {
    addRef(); addRef()
    addRef(); addRef()
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

  const [value, setValue] = useState(1);

  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Col span={24}>
      <div className='white_bg pd_20'>
        <h6>
          {t('Enter_the_answer', { ns: 'bank' })} <Required />
        </h6>
        <Form
          layout='horizontal'
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.List name='answer'>
            {(fields, { add, remove }) => {
              addRef = add;
              return (
                <>
                  <Checkbox.Group name='radiogroup'>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align='start'>
                        <Form.Item {...restField} name={name}>
                          <Row gutter={[8, 8]} align='middle' wrap={false}>
                            <Col span={1}>
                              <Checkbox value={name} />
                            </Col>
                            <Col span={1}>
                              <b> {getLetter(name)}) </b>
                            </Col>
                            <Col span={21}>
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
                    ))}
                  </Checkbox.Group>

                  <Form.Item>
                    <Row>
                      <Col flex={1}>
                        <Button disabled={fields.length >= 10} onClick={() => { fields.length < 10 && add() }}>
                          <PlusOutlined /> {t('Add_answer', { ns: 'bank' })}
                        </Button>
                      </Col>

                      <Col>
                        (*) {t('Choose_the', { ns: 'bank' })}{' '}
                        <b>{t('correct_answer', { ns: 'bank' })}</b>{' '}
                        {t('by_clicking_on_the_checkbox', { ns: 'bank' })}
                      </Col>
                    </Row>
                  </Form.Item>
                </>
              )
            }
            }
          </Form.List>
        </Form>
      </div>
    </Col>
  );
}

export default MultipleChoice;
