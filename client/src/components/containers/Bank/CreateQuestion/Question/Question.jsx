import React from 'react';
import { useTranslation } from 'react-i18next';
import TinyMCE from '../../../../commons/TinyMCE';
import { Col, Row } from 'antd';
import Required from '../../../../commons/Required';

function Question(props) {
  const { t } = useTranslation('bank');

  return (
    <>
      <Col span={24} className='question'>
        <div className='white_bg pd_20'>
          <Row gutter={[8, 8]}>
            <h6>
              {props.title} <Required />
            </h6>
            {props.subTitle && (
              <Col span={24}>
                <p> {t('Not_required', { ns: 'bank' })}</p>
              </Col>
            )}
            <Col span={24}>
              <TinyMCE />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
}

export default Question;
