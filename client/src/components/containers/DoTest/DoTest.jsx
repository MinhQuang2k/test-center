import { Col, Divider, Row } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

function DoTest(props) {


    return (
        <div className='do_test'>
            <Row>
                <Col span={12}>
                    <img className='banner' src="https://static.testcenter.vn/examiner_file/6c228ef38524b77074a4f87eb1a8fe61.png" alt="" />
                </Col>
                <Col span={12}>
                    <Row justify='center' align='middle' className='column'>
                        <Col>
                            <img className='logo' src={require('../../../assets/img/logo2.png')} />
                            <span className='name_netko'>NETKO-SOLUTION</span>
                        </Col>

                        <Col>
                            <h4>Ten dot thi</h4>
                        </Col>

                        <Col>
                            <p>gioi thieu</p>
                        </Col>
                        <Divider />
                        <Outlet />
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default DoTest;