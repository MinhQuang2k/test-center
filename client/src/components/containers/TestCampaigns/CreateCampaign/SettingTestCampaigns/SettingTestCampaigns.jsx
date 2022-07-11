import { Checkbox, Col, Collapse, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { useState } from 'react';
import { AntiCheatingType, CertificatesType, renderExtra, ResultTestType } from '../../../../../utils/utils';
import AccessCodeLink from './AccessCodeLink/AccessCodeLink';
import AvailableTest from './AvailableTest/AvailableTest';
import RequiredInformation from './RequiredInformation/RequiredInformation';
import { useTranslation } from 'react-i18next';


const { Option } = Select;


function SettingTestCampaigns(props) {

  const { t } = useTranslation('testCampaign')


  const [form] = Form.useForm();

  const [formSettingPassMark] = Form.useForm();

  const [renderSettingPassMark, setRenderSettingPassMark] = useState()

  const [requiredMark, setRequiredMarkType] = useState('optional');

  const [valueAntiCheating, setValueAntiCheating] = useState([
    {
      status: false,
      name: t('Prevent_copy', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Full_Screen_mode', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Prevent_paste', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Unfocus_on_screen', { ns: 'testCampaign' })
    },

  ])

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };


  ///ResultTest
  const [resultTest, setResultTest] = useState(
    [
      [
        t('Score', { ns: 'testCampaign' })
      ],
      [
        t('Pass_Not_Pass', { ns: 'testCampaign' })
      ]
    ]
  )



  //Kết quả test / Điểm:
  function onChangeCheckboxScore(checkedValues) {
    //console.log('checked = ', checkedValues);

    if (checkedValues.indexOf(1) >= 0 && checkedValues.indexOf(2) == -1) {
      setResultTest(prev => {
        const b = prev[0] = [t('Score', { ns: 'testCampaign' })]
        return [b, prev[1]]
      })
    }
    if (checkedValues.indexOf(2) >= 0 && checkedValues.indexOf(1) == -1) {
      setResultTest(prev => {
        const b = prev[0] = [t('Complete_percent', { ns: 'testCampaign' })]
        return [b, prev[1]]
      })
    }
    if (checkedValues.indexOf(1) >= 0 && checkedValues.indexOf(2) > -1) {
      setResultTest(prev => {
        const b = prev[0] = [t('Score', { ns: 'testCampaign' }), t('Complete_percent', { ns: 'testCampaign' })]
        return [b, prev[1]]
      })
    }
    if (checkedValues.indexOf(1) == -1 && checkedValues.indexOf(2) == -1) {
      setResultTest(prev => {
        const b = prev[0] = []
        return [b, prev[1]]
      })
    }

  }


  //Kết quả test / Kết quả:
  function onChangeCheckboxResult(checkedValues) {
    // //console.log('checked = ', checkedValues);

    if (checkedValues.indexOf(3) >= 0 && checkedValues.indexOf(4) == -1) {
      setResultTest(prev => {
        const b = prev[1] = [t('Detail', { ns: 'testCampaign' })]
        return [prev[0], b]
      })
    }
    if (checkedValues.indexOf(4) >= 0 && checkedValues.indexOf(3) == -1) {
      setResultTest(prev => {
        const b = prev[1] = [t('Pass_Not_Pass', { ns: 'testCampaign' })]
        return [prev[0], b]
      })
    }
    if (checkedValues.indexOf(3) >= 0 && checkedValues.indexOf(4) > -1) {
      setResultTest(prev => {
        const b = prev[1] = [t('Detail', { ns: 'testCampaign' }), t('Pass_Not_Pass', { ns: 'testCampaign' })]
        return [prev[0], b]
      })
    }
    if (checkedValues.indexOf(3) == -1 && checkedValues.indexOf(4) == -1) {
      setResultTest(prev => {
        const b = prev[1] = []
        return [prev[0], b]
      })
    }
  }

  const extraResultTest = (resultTest[0].concat(resultTest[1])).join(', ')


  function onChangePassMark(value) {
    setRenderSettingPassMark(value)
  }



  function onChange2(checkedValues) {
    //console.log('checked = ', checkedValues);
  }

  function onChangeAntiCheating(checkedValues) {
    //console.log('checked = ', checkedValues);
    for (let i = 0; i < valueAntiCheating.length; i++) {
      if (checkedValues.indexOf(i) !== -1) {
        setValueAntiCheating(prev => {
          prev[i].status = true
          return [...prev]
        })
      }
      else if (checkedValues.indexOf(i) === -1) {
        setValueAntiCheating(prev => {
          prev[i].status = false
          return [...prev]
        })
      }
    }

  }

  function onChangeUnfocusLimit(checkedValues) {
    //console.log('checked = ', checkedValues);
  }





  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12} className=''>
          <div className='white_bg pd_20'>
            <Form
              form={form}
              layout="vertical"

            >

              <Form.Item
                label={t('Name_of_Test_campaign', { ns: 'testCampaign' })}
                required='true'
              >
                <Input placeholder={t('Enter_name', { ns: 'testCampaign' })} />
              </Form.Item>
              <Form.Item label={t('Introduction', { ns: 'testCampaign' })} >
                <Input.TextArea rows={6} placeholder={t('Enter_introduction', { ns: 'testCampaign' })} />
                {t('This_field_is_shown_when_user_do_the_test', { ns: 'testCampaign' })}
              </Form.Item>
            </Form>
            <p>{t('The_exam_has_been_selected', { ns: 'testCampaign' })}</p>
            <p>test 2</p>
          </div>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]} >
            <Col span={24} >
              <AccessCodeLink />
            </Col>

            <Col span={24}>
              <div className='white_bg'>
                <AvailableTest />
              </div>
            </Col>
            <Col span={24}>
              <Collapse ghost className='white_bg' expandIconPosition='right' >
                <Collapse.Panel header={t('Result_page', { ns: 'testCampaign' })} key="1" extra={extraResultTest}>
                  <Row gutter={[8, 8]} >
                    <Col span={4}>
                      {t('Score', { ns: 'testCampaign' })}:
                    </Col>
                    <Col span={20} >
                      <Checkbox.Group onChange={onChangeCheckboxScore} defaultValue={`${ResultTestType.score}`}>
                        <Row gutter={[8, 8]} >
                          <Col span={24}>
                            <Checkbox value={ResultTestType.score}>{t('Score', { ns: 'testCampaign' })}</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.complete_percent}>{t('Complete_percent', { ns: 'testCampaign' })}</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                    <Col span={4}>
                      {t('Result', { ns: 'testCampaign' })}:
                    </Col>
                    <Col span={20} >
                      <Checkbox.Group onChange={onChangeCheckboxResult} defaultValue={`${ResultTestType.pass_or_not_pass}`}>
                        <Row gutter={[8, 8]} >
                          <Col span={24}>
                            <Checkbox value={ResultTestType.detail}>{t('Detail', { ns: 'testCampaign' })}</Checkbox>
                          </Col>
                          <Col span={24}>
                            <Checkbox value={ResultTestType.pass_or_not_pass}>{t('Pass_Not_Pass', { ns: 'testCampaign' })}</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={24}>

              <RequiredInformation />

            </Col>
            <Col span={24}>
              <Collapse ghost className='white_bg' expandIconPosition='right' >
                <Collapse.Panel header={t('Setting_pass_mark', { ns: 'testCampaign' })} key="1" extra={renderSettingPassMark !== undefined ? `${renderSettingPassMark}%` : null}>
                  <Form
                    form={formSettingPassMark}
                    layout="vertical"
                  >
                    <Form.Item label={t('Pass_Mark', { ns: 'testCampaign' })}>
                      <InputNumber addonAfter="%" step='1' min={0} max={100} onChange={onChangePassMark} />
                    </Form.Item>
                    <Form.Item label={t('Passed_message', { ns: 'testCampaign' })} >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label={t('Unpassed_message', { ns: 'testCampaign' })} >
                      <Input />
                    </Form.Item>
                  </Form>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={24}>
              <Collapse ghost className='white_bg' expandIconPosition='right' >
                <Collapse.Panel header={t('Certificates', { ns: 'testCampaign' })} key="1">
                  <Checkbox.Group onChange={onChange2}>
                    <Row gutter={[24, 24]} >
                      <Col span={24}>
                        <Checkbox value={CertificatesType.pass_the_test} disabled={renderSettingPassMark === undefined}>{t('Certificate_for_pass_the_test', { ns: 'testCampaign' })}</Checkbox>
                        {renderSettingPassMark === undefined ? <p>
                          {t('To_set_certificate_for_test_campaign_Please_set_pass_mark', { ns: 'testCampaign' })}
                        </p> : null}

                      </Col>
                      <Col span={24}>
                        <Checkbox value={CertificatesType.join_the_test}>{t('Certificate_for_join_the_test', { ns: 'testCampaign' })}</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={24}>
              <Collapse ghost className='white_bg' expandIconPosition='right' >
                <Collapse.Panel header={t('Anti_Cheating', { ns: 'testCampaign' })} key="1" extra={renderExtra(valueAntiCheating).join(', ')}>
                  <Checkbox.Group onChange={onChangeAntiCheating}>
                    <Row gutter={[16, 16]} >
                      <Col span={6}>
                        <Checkbox value={AntiCheatingType.prevent_copy}>{t('Prevent_copy', { ns: 'testCampaign' })}</Checkbox>

                      </Col>
                      <Col span={18}>
                        <Checkbox value={AntiCheatingType.full_screen_mode}>{t('Full_Screen_mode', { ns: 'testCampaign' })}</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox value={AntiCheatingType.prevent_paste}>{t('Prevent_paste', { ns: 'testCampaign' })}
                        </Checkbox>

                      </Col>
                      <Col span={18}>
                        <Checkbox value={AntiCheatingType.unfocus_on_screen}>{t('Unfocus_on_screen', { ns: 'testCampaign' })}</Checkbox>
                      </Col>
                      <Col span={24}>
                        {valueAntiCheating[3].status === true ? (<> <p>{t('Unfocus_limit', { ns: 'testCampaign' })}</p>< InputNumber min={0} defaultValue={3} onChange={onChangeUnfocusLimit} /> </>) : null}
                      </Col>

                    </Row>
                  </Checkbox.Group>
                </Collapse.Panel>
              </Collapse>
            </Col>
            {/* <Col span={24}>
                        <Collapse ghost className='white_bg' expandIconPosition='right' >
                            <Collapse.Panel header="Cài đặt khác" key="1" extra={'Không có'}>
                                <Checkbox.Group onChange={onChange4}>
                                    <Checkbox value="A">Cho phép highlight</Checkbox>
                                </Checkbox.Group>
                            </Collapse.Panel>
                        </Collapse>
                    </Col> */}


          </Row>
        </Col >
      </Row>
    </>
  );
}

export default SettingTestCampaigns;