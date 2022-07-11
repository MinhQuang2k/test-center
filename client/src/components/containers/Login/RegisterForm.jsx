import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
} from '../../../slices/multiLanguage';
import { register } from '../../../slices/userSlice';
import CarouselLogin from './CarouselLogin';

function RegisterForm(props) {
  const { t, i18n } = useTranslation('common', 'login');
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const onFinish = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const msg = unwrapResult(resultAction);
      setMsg(msg);
      navigate('/login', { replace: true });
    } catch (error) {
      setMsg(error.message);
    }
  };

  const handleChange = (value) => {
    if (value === 'EN') {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  document.title = t('Register', { ns: 'login' });
  return (
    <div className='login white_bg'>
      <Row>
        <Col span={12}>
          <CarouselLogin />
        </Col>
        <Col span={12}>
          <div className='login_form register_form'>
            <Row justify='center'>
              <Col span={24} className='Select'>
                <Select
                  defaultValue={t('header.real_language')}
                  onChange={handleChange}
                >
                  <Select.Option value='EN'>
                    <img
                      style={{ width: '30px' }}
                      src={require('../../../assets/img/US.png')}
                      alt='EN'
                    />{' '}
                    EN
                  </Select.Option>
                  <Select.Option value='VI'>
                    <img
                      style={{ width: '30px' }}
                      src={require('../../../assets/img/VI.png')}
                      alt='VI'
                    />{' '}
                    VI
                  </Select.Option>
                </Select>
              </Col>
              <Col>
                <img
                  src={require('../../../assets/img/logo2.png')}
                  alt='Logo'
                />
              </Col>
              <Col span={24}>
                <h3>{t('Register', { ns: 'login' })}</h3>
              </Col>
              <Col span={24}>
                <Form initialValues={{ remember: true }} onFinish={onFinish}>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: t('The_Full_name_field_is_required', {
                          ns: 'login',
                        }),
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder={t('Full_name', { ns: 'login' })}
                    />
                  </Form.Item>

                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: t('The_Email_field_is_required', {
                          ns: 'login',
                        }),
                      },
                    ]}
                  >
                    <Input
                      type='email'
                      prefix={<MailOutlined />}
                      placeholder='Email'
                    />
                  </Form.Item>

                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: t('The_Password_field_is_required', {
                          ns: 'login',
                        }),
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder={t('Password', { ns: 'login' })}
                    />
                  </Form.Item>

                  <Form.Item
                    name='confPassword'
                    rules={[
                      {
                        required: true,
                        message: t(
                          'The_Password_confirmation_field_is_required',
                          { ns: 'login' },
                        ),
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder={t('Password_confirmation', { ns: 'login' })}
                      minLength={6}
                      maxLength={20}
                    />
                  </Form.Item>

                  <p className='text_red'>
                    {msg ===
                      'The Password confirmation confirmation does not match' &&
                      t(
                        'The_Password_confirmation_confirmation_does_not_match',
                        { ns: 'login' },
                      )}
                  </p>
                  <p className='text_red'>
                    {msg === 'Email has been already existed' &&
                      t('Email_has_been_already_existed', { ns: 'login' })}
                  </p>

                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      {t('Register', { ns: 'login' })}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                <span className='text_mute'>
                  {t('Already_have_an_account', { ns: 'login' })}{' '}
                </span>
                <Link to='/login'>{t('Login', { ns: 'login' })}</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterForm;
