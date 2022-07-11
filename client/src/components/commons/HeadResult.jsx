import { Button, Col, Row } from 'antd';
import ResultView from '../containers/DoTest/ResultView/ResultView';

function HeaderResult(props) {
  return (
    <div className='white_bg'>
      <Row justify='center' className='header_do_test'>
        <Col xs={24} md={20} lg={20} xl={18} xxl={14}>
          <Row align='middle' gutter={[16, 16]} justify='space-around'>
            <Col>
              <img src={require('../../assets/img/logo2.png')} />
            </Col>
            <Col flex={1}>
              <b>ten dot thi</b>
              <p>NetKo Solution</p>
            </Col>
            <Col>
              <Button>Thoát</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify='center' className='content_do_test'>
        <Col xs={24} md={20} lg={20} xl={18} xxl={14}>
          <ResultView />
        </Col>
      </Row>
    </div>
  );
}

export default HeaderResult;
