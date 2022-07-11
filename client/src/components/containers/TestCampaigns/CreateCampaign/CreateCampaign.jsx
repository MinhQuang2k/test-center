import { Breadcrumb, Col, Row, Modal, Button, message, Steps } from 'antd';
import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import Preview from './Preview/Preview';
import SelectTest from './SelectTest/SelectTest';
import SettingTestCampaigns from './SettingTestCampaigns/SettingTestCampaigns';
import { useTranslation } from 'react-i18next'

const { Step } = Steps;


function CreateCampaign() {
  const { t } = useTranslation('testCampaign')


  const [current, setCurrent] = useState(0);
  const [checkSelectTest, setCheckSelectTest] = useState(false)


  const steps = [
    {
      title: t('Select_test', { ns: 'testCampaign' }),
      content: <SelectTest
        setCheckSelectTest={setCheckSelectTest} />,
      description: t('Exam_cannot_be_changed_after_the_exam_is_created', { ns: 'testCampaign' })
    },
    {
      title: t('Setting', { ns: 'testCampaign' }),
      content: <SettingTestCampaigns />,
      description: t('Exam_name_access_code_time', { ns: 'testCampaign' })
    },
    {
      title: t('Preview', { ns: 'testCampaign' }),
      content: <Preview />,
      description: t('See_how_the_contest_has_been_created', { ns: 'testCampaign' })
    },
  ];

  function modalError() {
    Modal.error({
      content: t('Please_select_a_test_to_continue', { ns: 'testCampaign' }),
      maskClosable: true
    })
  }



  const onChange = current => {
    // console.log('onChange:', current);
    if (checkSelectTest) {
      setCurrent(current)
    } else {
      modalError()
    }
    if (current === 0) {
      setCheckSelectTest(false)
    }

  };


  const onClickBtnContinue = () => {
    if (checkSelectTest) {
      setCurrent(current + 1);
    } else {
      modalError()
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>


      <Row gutter={[24, 24]} className='create_campaign'>
        <Col span={24}>
          <Breadcrumb >
            <Breadcrumb.Item>
              <Link to="/test-campaigns"><span>{t('test_campaign', { ns: 'testCampaign' })}</span></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{t('test_campaign', { ns: 'testCampaign' })}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24}>

          <Steps
            current={current}
            className='pd_20 white_bg'
            type="navigation"
          >
            {steps.map((item) => (
              <Step key={item.title} title={item.title} description={item.description} />
            ))}
          </Steps>
        </Col>

        <Col span={24} >
          <div className="steps-content">{steps[current].content}</div>
        </Col>
        <Col span={24}>
          <div className="steps-action">
            {current === 0 && (

              <Row gutter={[16, 16]} justify='end'>
                <Col>
                  <Link to="/test-campaigns"><Button >{t('cancel', { ns: 'testCampaign' })}</Button></Link>
                </Col>
                <Col>
                  <Button onClick={onClickBtnContinue} type="primary">{t('continue', { ns: 'testCampaign' })}</Button>
                </Col>
              </Row>
            )}
            {current === 1 && (
              <Row gutter={[16, 16]} justify='end'>
                <Col offset={13}>
                  <Link to="/test-campaigns"><Button >{t('cancel', { ns: 'testCampaign' })}</Button></Link>
                </Col>
                <Col>
                  <Link to={`/test-campaigns/:id/edit`}><Button type="primary">{t('Public', { ns: 'testCampaign' })}</Button></Link>
                </Col>
              </Row>
            )}

          </div>
        </Col>

      </Row>
    </div>
  );
}

export default CreateCampaign;