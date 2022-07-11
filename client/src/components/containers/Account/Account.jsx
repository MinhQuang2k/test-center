import { Row, Col, Tabs, Breadcrumb, Form, Input, Select, Button, Checkbox, Tooltip, Modal, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserOutlined, UnlockFilled, InfoCircleFilled, UnorderedListOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons'
import { Link, Outlet, useLocation } from 'react-router-dom'

function Account(props) {
  const { t } = useTranslation('account');

  const location = useLocation();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const showModalDelete = () => {
    Modal.confirm({
      title: t('Notification', { ns: 'testCampaign' }),
      icon: <ExclamationCircleOutlined />,
      content: t('notifi_delete', { ns: 'testCampaign' }),
      okText: t('yes', { ns: 'testCampaign' }),
      cancelText: t('no', { ns: 'testCampaign' }),
      onOk() {
        //console.log('delete') 
      },
      maskClosable: true
    })
  }

  const showModalCopy = () => {
    Modal.confirm({
      title: t('duplicate', { ns: 'testCampaign' }),
      icon: <ExclamationCircleOutlined />,
      content: t('notifi_duplicate', { ns: 'testCampaign' }),
      okText: t('Yes_duplicate_it', { ns: 'testCampaign' }),
      cancelText: t('no', { ns: 'testCampaign' }),
      onOk() {
        //console.log('copy') 
      },
      maskClosable: true
    })
  }


  return (
    <>
      <Row gutter={[16, 16]} className='account'>
        <Col span={24}>
          <Breadcrumb >
            <Breadcrumb.Item>{t('Account', { ns: 'account' })}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <div className='white_bg'>
            <Row>
              <Col span={6}>
                <Menu
                  defaultSelectedKeys={['/account/profile']}
                >
                  <Menu.Item key={1}>
                    <Link to='/account/profile'><UserOutlined /> {t('Account_info', { ns: 'account' })}</Link>
                  </Menu.Item>
                  <Menu.Item key={2}>
                    <Link to='/account/change-password'><UnlockFilled /> {t('Change_password', { ns: 'account' })}</Link>
                  </Menu.Item>

                  <Menu.Item key={3}>
                    <Link to='/account/manage-certificates'><UnorderedListOutlined /> {t('Manage_certificate', { ns: 'account' })}</Link>
                  </Menu.Item>

                  <Menu.Item key={4}>
                    <Link to='/account/profile'><InfoCircleFilled /> {t('Integration', { ns: 'account' })}</Link>
                  </Menu.Item>
                </Menu>
              </Col>

              <Col span={18}>
                <div className='pd_20'>
                  <Outlet />
                </div>
              </Col>
            </Row>

          </div>
        </Col>

      </Row >
    </>
  );
}

export default Account;
