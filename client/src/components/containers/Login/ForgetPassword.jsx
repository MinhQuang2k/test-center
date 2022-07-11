import { MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  multiLanguageSelector,
} from '../../../slices/multiLanguage';
import CarouselLogin from './CarouselLogin';
import axios from 'axios';
import { useState } from 'react';


function ForgetPassword(props) {
  const { t, i18n } = useTranslation('common', 'login');
  const { language } = useSelector(multiLanguageSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('')
  const [loadingRequest, setLoadingRequest] = useState(false)

  const onFinish = async (values) => {
    setLoadingRequest(true)
    try {
      await axios.post(`${process.env.REACT_APP_API_URL_DEV}/api/send-mail`, {
        email: values.email,
      });
      message.success(t('Email_has_been_sent', { ns: 'login' }));
      navigate('/login');
    } catch (error) {

      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    setLoadingRequest(false)
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
                <h3>{t('Forget_password', { ns: 'login' })}</h3>
              </Col>
              <Col>
                <p className='text_mute'>
                  {t('Enter_the_email', { ns: 'login' })}
                </p>
              </Col>
              <Col span={24}>
                <Spin spinning={loadingRequest}>
                  <Form initialValues={{ remember: true }} onFinish={onFinish}>
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

                    <p className='text_red'>
                      {msg === 'Email is not registered' &&
                        t('Email_is_not_registered', { ns: 'login' })}
                    </p>

                    <Form.Item>
                      <Button type='primary' htmlType='submit'>
                        {t('Confirm', { ns: 'login' })}
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
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

export default ForgetPassword;
