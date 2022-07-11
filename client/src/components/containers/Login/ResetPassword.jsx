import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  multiLanguageSelector,
} from '../../../slices/multiLanguage';
import CarouselLogin from './CarouselLogin';
import axios from 'axios';
import { useEffect } from 'react';
import PageLoading from '../../commons/PageLoading';
import { useState } from 'react';

function ResetPassword(props) {
  const { t, i18n } = useTranslation('common', 'login');
  const { language } = useSelector(multiLanguageSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const mailToken = searchParams.get('mailToken');
  const email = searchParams.get('email');
  const [msg, setMsg] = useState('')

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_DEV}/api/verify-email`,
        {
          mailToken: mailToken,
        },
      );
    } catch (error) {
      navigate('/forget-password');
      if (error.response) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_DEV}/api/reset-password`,
        {
          email: email,
          password: values.password,
        },
      );
      message.success(t('Change_password_successfully', { ns: 'login' }));
      navigate('/login');
    } catch (error) {
      navigate('/forget-password');
      if (error.response) {
        setMsg(error.response.data.msg)
      }
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

  document.title = t('Login', { ns: 'login' });

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className='login white_bg'>
          <Row>
            <Col span={12}>
              <CarouselLogin />
            </Col>
            <Col span={12}>
              <div className='login_form'>
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
                    <img src={require('../../../assets/img/logo2.png')} />
                  </Col>
                  <Col span={24}>
                    <h3>{t('Reset_password', { ns: 'login' })}</h3>
                  </Col>
                  <Col>
                    <p className='text_mute'>
                      {t('Update_your_new_password', { ns: 'login' })}
                    </p>
                  </Col>
                  <Col span={24}>
                    <Form
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                    >
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
                          minLength={6}
                          maxLength={20}
                        />
                      </Form.Item>

                      {msg}

                      <Form.Item>
                        <Button type='primary' htmlType='submit'>
                          {t('Confirm', { ns: 'login' })}
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
      )}
    </>
  );
}

export default ResetPassword;
