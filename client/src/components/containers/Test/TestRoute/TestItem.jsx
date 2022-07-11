import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Button } from 'antd';
import { useTranslation } from 'react-i18next';
function TestItem({ exam }) {
  const { t } = useTranslation('common');
  return (
    <>
      <Divider />
      <Row
        gutter={8}
        align='middle'
        justify='space-between'
        className='test-detail'
      >
        <Col md={12}>
          <div className='test-detail-header'>
            <h3>{exam.name}</h3>
            <p>{exam.link}</p>
          </div>
        </Col>
        <Col md={12}>
          <div className='test-detail-option'>
            <Button type='link' className='link'>
              {t('button.copy_link', { ns: 'common' })}
            </Button>
            <Link to={'/test-campaigns'} className='link'>
              {t('button.setting', { ns: 'common' })}
            </Link>
            <Link to={'/test-campaigns'} className='btn-link'>
              {t('button.result', { ns: 'common' })}
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default TestItem;
