import React from 'react';
import { Col, Radio, Row } from 'antd';
import TinyMCE from '../../../../commons/TinyMCE';
import Required from '../../../../commons/Required';
import { useTranslation } from 'react-i18next';

function TrueFalse(props) {
  const { t } = useTranslation('bank');

  return (
    <Col span={24}>
      <div className='white_bg pd_20'>
        <h6>
          {t('Enter_the_answer', { ns: 'bank' })} <Required />
        </h6>
        <Radio.Group name='radiogroup' defaultValue={1}>
          <Row gutter={[8, 8]} align='middle'>
            <Col span={1}>
              <Radio value={1} />
            </Col>
            <Col span={1}>
              <b>A)</b>{' '}
            </Col>
            <Col span={22}>
              <TinyMCE />
            </Col>
            <Col span={1}>
              <Radio value={2} />
            </Col>
            <Col span={1}>
              <b>B)</b>{' '}
            </Col>
            <Col span={22}>
              <TinyMCE />
            </Col>
            <Col>
              (*) {t('Choose_the', { ns: 'bank' })}{' '}
              <b>{t('correct_answer', { ns: 'bank' })}</b>{' '}
              {t('by_clicking_on_the_checkbox', { ns: 'bank' })}
            </Col>
          </Row>
        </Radio.Group>
      </div>
    </Col>
  );
}

export default TrueFalse;
