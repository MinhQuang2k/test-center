import React, { useState } from 'react';
import { Breadcrumb, Row, Col, Button, message, Switch } from 'antd'
import { Link } from "react-router-dom"
import Dot from '../../../../commons/Dot';
import {
  CopyOutlined,
  SettingOutlined,
  ProjectOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';
import SettingTestCampaigns from '../SettingTestCampaigns/SettingTestCampaigns';
import copy from 'copy-text-to-clipboard'
import { useTranslation } from 'react-i18next';


function Preview(props) {
  const { t } = useTranslation('testCampaign')

  const [renderSetting, setRenderSetting] = useState(false)

  const onClickBtnCopy = () => {
    copy('hello')
    message.success({
      content: t('Copied_successfully', { ns: 'testCampaign' }),
    })
  }

  const onChange = (checked) => {
    //console.log(`switch to ${checked}`);
    message.success(t('Update_status_successfully', { ns: 'testCampaign' }));

  };

  function onClickSetting() {
    setRenderSetting(true)
  }


  return (
    <div className='preview'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/test-campaigns">{t('test_campaign', { ns: 'testCampaign' })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              dot thi
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>



        {!renderSetting ? (<>

          <Col span={24}>
            <Row gutter={[8, 8]} align='middle'>
              <Col flex={1}>
                <h4>dot thi</h4>
              </Col>
              <Col>
                <Button type="primary" onClick={onClickSetting}><SettingOutlined /> {t('Setting', { ns: 'testCampaign' })}</Button>
              </Col>
              <Col>
                <Link to="/test-campaigns/26626/result"><Button> <ProjectOutlined /> {t('View_Resul', { ns: 'testCampaign' })}</Button></Link>


              </Col>
              <Col>
                <Switch defaultChecked onChange={onChange} />

              </Col>
            </Row>

          </Col>


          <Col span={9}>
            <div className='white_bg pd_20'>
              <Row gutter={[8, 8]} align='middle'>
                <Col flex={1}>
                  <h6>{t('Test_campaign_information', { ns: 'testCampaign' })}</h6>
                </Col>
                <Col>
                  <p>{t('Active', { ns: 'testCampaign' })} <Dot /> </p>
                </Col>
                <Col span={24}>
                  <p>{t('LINK_TEST_CAMPAIGN', { ns: 'testCampaign' })}</p>
                </Col>
                <Col span={20}>
                  <a target="_blank" rel="noopener noreferrer" href="http://your_url_here.html">http://localhost:3000/test-campaigns/:id/edit</a>
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={onClickBtnCopy}><CopyOutlined /></Button>
                </Col>
                <Col span={12}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <p>{t('DESCRIPTION', { ns: 'testCampaign' })}</p>
                      <p>ewf</p>
                    </Col>
                    <Col span={24}>
                      <p>{t('TEST', { ns: 'testCampaign' })}</p>
                      <Link to="/test-campaigns">dot thi</Link>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <p>{t('SCAN_TO_JOIN_TEST', { ns: 'testCampaign' })}</p>
                  <QRCodeSVG value="https://google.com/" />
                </Col>

              </Row>
            </div>
          </Col>
          <Col span={15}>
            <div className='white_bg pd_20'>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h6>{t('Setting_Accessbility', { ns: 'testCampaign' })}</h6>
                </Col>
                <Col span={12}>
                  <p>{t('AVAILABLE', { ns: 'testCampaign' })}</p>
                  <span>{t('Unlimited', { ns: 'testCampaign' })}</span>
                </Col>
                <Col span={12}>
                  <p>{t('RESULT_PAGE', { ns: 'testCampaign' })}</p>
                  <span>
                    {t('Score', { ns: 'testCampaign' })},
                    {t('Complete_percent', { ns: 'testCampaign' })},
                    {t('Detail', { ns: 'testCampaign' })}
                  </span>
                </Col>
                <Col span={12}>
                  <p>{t('Phone', { ns: 'testCampaign' })}</p>
                  <span>{t('Fullname', { ns: 'testCampaign' })}</span>
                </Col>
                <Col span={12}>
                  <p>{t('ACCESS_CODE_LINK', { ns: 'testCampaign' })}</p>
                  <span>{t('Public_Link', { ns: 'testCampaign' })}</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <Link to="/test-campaigns"><Button >{t('cancel', { ns: 'testCampaign' })} </Button></Link>
          </Col>

        </>) :
          <>
            <Col span={24}>
              <Row gutter={[8, 8]} align='middle'>
                <Col flex={1}>
                  <h4>{t('Required_information', { ns: 'testCampaign' })}</h4>
                </Col>
              </Row>
            </Col>
            <SettingTestCampaigns />
          </>
        }



      </Row>
    </div >
  );
}

export default Preview;