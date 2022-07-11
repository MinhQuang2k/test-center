import { Menu, Row, Col } from 'antd';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Statistic(props) {
  const { t } = useTranslation('statistic');

  const location = useLocation();

  return (
    <div className='statistic'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Menu
            mode='horizontal'
            selectedKeys={location.pathname}
          >
            <Menu.Item key='/statistic/campaigns'>
              <Link to='/statistic/campaigns'>
                {t('test_campaign', { ns: 'statistic' })}
              </Link>
            </Menu.Item>
            <Menu.Item key='/statistic/tests'>
              <Link to='/statistic/tests'>
                {t('test', { ns: 'statistic' })}
              </Link>
            </Menu.Item>
            <Menu.Item key='/statistic/answer-sheets'>
              <Link to='/statistic/answer-sheets'>
                {t('candidates', { ns: 'statistic' })}
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={24}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default Statistic;
