import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Edit(props) {
  const { t } = useTranslation('admin');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const accessTokenLocalStorage = useSelector(
    (state) => state.user.accessTokenLocalStorage,
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const submitForm = async (values) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_URL_DEV + '/api/edit',
        {
          id: props.user.id,
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessTokenLocalStorage}`,
          },
        },
      );
      handleCancel();
      props.getUser();
      message.success(t('Edit_successful', { ns: 'admin' }));
    } catch (error) {
      if (error) {
        message.success(t('Edit_failure', { ns: 'admin' }))
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type='link' onClick={showModal}>
        {t('Edit', { ns: 'admin' })}
      </Button>
      <Modal
        title={`${t('Edit_user', { ns: 'admin' })} ${props.user.name}`}
        visible={isModalVisible}
        footer={false}
        className='user_modal'
        onCancel={handleCancel}
      >
        <Form
          name='basic'
          initialValues={{
            name: props.user.name,
            email: props.user.email,
          }}
          onFinish={submitForm}
          onFinishFailed={onFinishFailed}
        >
          <Row justify='end'>
            <Col span={24}>
              <Form.Item
                label={t('Name', { ns: 'admin' })}
                name='name'
                rules={[{ required: true, message: t('The_Name_field_is_required', { ns: 'admin' }) }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: t('The_Email_field_is_required', { ns: 'admin' }) }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={t('Password', { ns: 'admin' })}
                name='password'
                rules={[{ required: true, message: t('The_Password_field_is_required', { ns: 'admin' }) }]}
              >
                <Input.Password
                  minLength={6}
                  maxLength={20}
                />
              </Form.Item>
            </Col>

            <Col>
              <Form.Item>
                <Button onClick={handleCancel}>{t('Cancel', { ns: 'admin' })}</Button>
                <Button type='primary' htmlType='submit'>
                  {t('Save', { ns: 'admin' })}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default Edit;
