import { Col, Row } from 'antd';
import React from 'react';

function TestCase(props) {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <p>Thông báo biên dịch</p>
                    <div className='value'>
                        <p >Sai !</p>
                    </div>

                </Col>
                <Col span={24}>
                    <p>Đầu vào (stdin)</p>
                    <div className='value'>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                        <p >sadas</p>
                    </div>
                </Col>
                <Col span={24}>
                    <p>Đầu ra của bạn (stdout)</p>
                    <div className='value'>
                        <p >Sai !</p>
                    </div>
                </Col>
                <Col span={24}>
                    <p>Đầu ra kỳ vọng</p>
                    <div className='value'>
                        <p >Sai !</p>
                    </div>
                </Col>

            </Row>
        </div>
    );
}

export default TestCase;