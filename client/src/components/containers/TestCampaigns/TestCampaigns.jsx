import {
  CalendarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddFilled,
  LinkOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  Switch,
  Tooltip,
  Modal,
} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dot from '../../commons/Dot';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'




function TestCampaigns(props) {

  const { t } = useTranslation('testCampaign')

  const onSearch = value => {
    //console.log(value);
  }

  function handleChange(value) {
    //console.log(`selected ${value}`);
  }

  function onChange(checked) {
    //console.log(`switch to ${checked}`);
    message.success(t('Update_status_successfully', { ns: 'testCampaign' }));
  }

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

    <div className='test_campaigns'>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col flex={1}>
              <h6>{t('test_campaign', { ns: 'testCampaign' })}</h6>
            </Col>
            <Col >

              <Button type="primary" ><FileAddFilled />{t('Import_essays_score_from_file', { ns: 'testCampaign' })}</Button>
            </Col>
            <Col>
              <Link to="create"><Button type="primary" ><PlusCircleFilled /> {t('Create_test_campaign', { ns: 'testCampaign' })}</Button></Link>
            </Col>
          </Row>
        </Col>
        <Col flex={1}>
          <Input.Search placeholder={t('Search_test_campaign', { ns: 'testCampaign' })} onSearch={onSearch} enterButton />
        </Col>
        <Col offset={12}>
          <Select defaultValue={1} style={{ width: 150 }} onChange={handleChange} >
            <Select.Option value={1}>{t('Recently_added', { ns: 'testCampaign' })}</Select.Option>
            <Select.Option value={2}>{t('Alphabet', { ns: 'testCampaign' })}</Select.Option>
          </Select>
        </Col>


        <Col span={24}>
          <div className='pd_15 white_bg'>
            <Row gutter={[24, 24]} justify='space-between' align='middle'>
              <Col >
                <Dot />
              </Col>
              <Col flex={1}>
                <h5>dot thi 1</h5>
                <div className='link_copy'>
                  <span> <CalendarOutlined /> {t('Unlimited_Time', { ns: 'testCampaign' })}</span>
                  <span className='long_text'> <LinkOutlined /> https://e.testcenter.vn/t/cUV6V3gOJFAOM1RcRyYED0F4SHIX</span>
                </div>
              </Col>
              <Col offset={2}>
                <Tooltip placement="top" title={t('edit', { ns: 'testCampaign' })}>
                  <Link to={`/test-campaigns/:id/edit`}><Button type="link"><EditOutlined /></Button></Link>

                </Tooltip>
                <Tooltip placement="top" title={t('duplicate', { ns: 'testCampaign' })}>
                  <Button type="link" onClick={showModalCopy}><CopyOutlined /></Button>

                </Tooltip>
                <Tooltip placement="top" title={t('delete', { ns: 'testCampaign' })} >
                  <Button type="link" onClick={showModalDelete}><DeleteOutlined /></Button>
                </Tooltip>
                <Switch defaultChecked onChange={onChange} />
                <Link to={`/test-campaigns/:id/result`}><Button>{t('result', { ns: 'testCampaign' })}</Button></Link>

              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TestCampaigns;
