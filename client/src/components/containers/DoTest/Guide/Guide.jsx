import { Button, Col, Row } from 'antd';
import React from 'react';
import { Link } from "react-router-dom"

function Guide(props) {
    return (

        <Row align='middle' gutter={[24, 24]}>
            <Col span={6} offset={10}>
                <h4>
                    Hướng dẫn
                </h4>
            </Col>
            <Col span={12} offset={6}>
                <b>
                    1. Thời gian làm bài
                </b>
                <p>- Không giới hạn thời gian làm bài</p>

            </Col>

            <Col span={12} offset={6}>
                <b>
                    2. Nội quy
                </b>
                <p>- Không nhờ người khác thi hộ.</p>
                <p>- Không sao chép câu trả lời từ tài liệu trên internet.</p>

            </Col>

            <Col span={12} offset={6}>
                <b>
                    3. Làm lại bài thi
                </b>
                <p>- Bài thi này có thể làm lại</p>

            </Col>
            <Col span={6} offset={10}>
                <Link to='/do-test-in-single/exam-question' >
                    <Button type='primary'>Bắt đầu làm bài</Button>
                </Link>
            </Col>
        </Row>

    );
}

export default Guide;