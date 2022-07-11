import { Breadcrumb, Row, Col } from 'antd';
import TestInfo from './TestInfo';
import TestTimeLine from './TestTimeLine';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function TestResultDetail() {
  const { t } = useTranslation('test', 'common');
  return (
    <div className='container test-result'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb >
            <Breadcrumb.Item>
              <Link to='/tests'>{t('header.test', { ns: 'common' })}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/tests/12/result'>
                {t('test_result', { ns: 'test' })}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Result test name</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row gutter={24} justify='space-around'>
            <Col md={7} sm={10} xs={24}>
              <Row gutter={[24, 24]}>
                {/* result info */}
                <TestInfo />
                {/* timeline section */}
                <TestTimeLine />
              </Row>
            </Col>
            <Col md={17} sm={14} xs={24}>
              <div className='content'>helo</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TestResultDetail;
