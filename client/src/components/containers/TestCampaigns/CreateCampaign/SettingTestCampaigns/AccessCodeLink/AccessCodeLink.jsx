import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Col, Collapse, Input, InputNumber, Modal, Radio, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessCodeType } from '../../../../../../utils/utils';
import Required from '../../../../../commons/Required';



function AccessCodeLink(props) {

  const { t } = useTranslation('testCampaign')


  const [value, setValue] = useState(AccessCodeType.public);

  const [extraTip, setExtraTip] = useState(t('Public_Link', { ns: 'testCampaign' }))


  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = e => {
    //console.log('radio checked', e.target.value);
    const valueCheck = e.target.value
    setValue(valueCheck);
    if (valueCheck === AccessCodeType.password) {
      setExtraTip(t('Password', { ns: 'testCampaign' }))
    } else if (valueCheck === AccessCodeType.access_code) {
      setExtraTip(t('Access_code', { ns: 'testCampaign' }))
    } else if (valueCheck === AccessCodeType.public) {
      setExtraTip(t('Public_Link', { ns: 'testCampaign' }))
    }
  };

  const onAddCode = () => {
    prompt(t('Enter_the_number_you_want_to_generate_code_automatiSavecally', { ns: 'testCampaign' }), 25);
  }

  function onChangeInputNumber(value) {
    //console.log('changed', value);
  }
  //console.log(value)

  function Password() {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col>
            <p>{t('Enter_the_unique_code_that_is_shared_by_all_candidates', { ns: 'testCampaign' })}</p>
          </Col>
          <Col span={24}>
            <Input placeholder={t('Enter_code', { ns: 'testCampaign' })} />
          </Col>
        </Row>
      </>
    )
  }

  function AccessCode() {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col>
            <p>{t('Each_candidate_will_use_a_code_from_the_list_you_created_to_access_the_test_link', { ns: 'testCampaign' })}</p>
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={showModal}>
              <PlusCircleFilled /> {t('Generate_Codes', { ns: 'testCampaign' })}
            </Button>

            <Modal
              title={t('Generate_list_access_codes', { ns: 'testCampaign' })}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={t('Save', { ns: 'testCampaign' })}
              cancelText={t('cancel', { ns: 'testCampaign' })}
            >
              <Row gutter={[16, 16]}>
                <Col flex={1}>
                  <p>{t('Enter_the_code_in_the_input_below_or_generate_it_automatically_from_the_system', { ns: 'testCampaign' })} <Required /></p>
                </Col>
                <Col>
                  <Button type="primary" onClick={onAddCode}>{t('Generate', { ns: 'testCampaign' })}</Button>
                </Col>
                <Col span={24}>
                  <Input.TextArea placeholder={t('Enter_the_list_code', { ns: 'testCampaign' })} rows={6} />
                </Col>
              </Row>
            </Modal>
          </Col>
          <Col span={24}>
            <p>{t('Attempt_limit_per_access_code', { ns: 'testCampaign' })} <Required /></p>
          </Col>
          <Col span={24}>
            <InputNumber min={1} onChange={onChangeInputNumber} />
          </Col>
        </Row>
      </>
    )
  }

  function Public() {
    return (<p>{t('Everyone_has_access_to_the_link_and_does_the_test', { ns: 'testCampaign' })}</p>)
  }


  return (
    <div>
      <Collapse ghost className='white_bg' expandIconPosition='right' >
        <Collapse.Panel header={t('Access_code_link', { ns: 'testCampaign' })} key="1" extra={extraTip}>
          <Row gutter={[16, 16]}>
            <Col>
              <Radio.Group onChange={onChange} value={value} defaultValue={AccessCodeType.public}>
                <Radio value={AccessCodeType.password}>{t('Password', { ns: 'testCampaign' })}</Radio>
                <Radio value={AccessCodeType.access_code}>{t('Access_code', { ns: 'testCampaign' })}</Radio>
                <Radio value={AccessCodeType.public}>{t('Public_Link', { ns: 'testCampaign' })}</Radio>
              </Radio.Group>

            </Col>
            <Col>

              {(() => {
                if (value === AccessCodeType.password) return <Password />;
                if (value === AccessCodeType.access_code) return <AccessCode />;
                if (value === AccessCodeType.public) return <Public />;
              })()}
            </Col>
          </Row>

        </Collapse.Panel>
      </Collapse>
    </div >
  );
}

export default AccessCodeLink;