import { Checkbox, Col, Collapse, Row } from 'antd';
import React, { useState } from 'react';
import { RequiredInformationType, renderExtra } from '../../../../../../utils/utils';
import { useTranslation } from 'react-i18next';



function RequiredInformation(props) {

  const { t } = useTranslation('testCampaign')


  // const [requiredInformation, setRequiredInformation] = useState(['Họ và tên'])

  const [valueExtra, setValueExtra] = useState([
    {
      status: false,
      name: t('Phone', { ns: 'testCampaign' })
    },
    {
      status: true,
      name: t('Fullname', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Group', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Email', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('ID', { ns: 'testCampaign' })
    },
    {
      status: false,
      name: t('Position', { ns: 'testCampaign' })
    }
  ])




  function onChangeRequiredInformation(checkedValues) {
    // //console.log('checked = ', checkedValues);


    for (let i = 0; i < valueExtra.length; i++) {
      if (checkedValues.indexOf(i) !== -1) {
        setValueExtra(prev => {
          prev[i].status = true
          return [...prev]
        })
      }
      else if (checkedValues.indexOf(i) === -1) {
        setValueExtra(prev => {
          prev[i].status = false
          return [...prev]
        })
      }
    }
  }






  return (
    <>
      <Collapse ghost className='white_bg' expandIconPosition='right' >
        <Collapse.Panel header={t('Required_information', { ns: 'testCampaign' })} key="1" extra={renderExtra(valueExtra).join(', ')}>
          <Checkbox.Group
            onChange={onChangeRequiredInformation}
            defaultValue={`${RequiredInformationType.full_name}`}
          >
            <Row gutter={[16, 16]}>
              <Col span={7}>
                <Checkbox value={RequiredInformationType.phone}>{t('Phone', { ns: 'testCampaign' })}</Checkbox>
              </Col>
              <Col span={7}>
                <Checkbox value={RequiredInformationType.full_name}>{t('Fullname', { ns: 'testCampaign' })}</Checkbox>
              </Col>
              <Col span={7}>

                <Checkbox value={RequiredInformationType.group}>{t('Group', { ns: 'testCampaign' })}</Checkbox>
              </Col>
              <Col span={7}>

                <Checkbox value={RequiredInformationType.email}>{t('Email', { ns: 'testCampaign' })}</Checkbox>
              </Col>
              <Col span={7}>

                <Checkbox value={RequiredInformationType.id}>{t('ID', { ns: 'testCampaign' })}</Checkbox>
              </Col>
              <Col span={7}>

                <Checkbox value={RequiredInformationType.position}>{t('Position', { ns: 'testCampaign' })}</Checkbox>
              </Col>

            </Row>
          </Checkbox.Group>
        </Collapse.Panel>
      </Collapse>
    </>
  );
}

export default RequiredInformation;