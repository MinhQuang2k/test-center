import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Required from '../../../commons/Required';

function InfoCollect(props) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Col>
            <Form
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item
                            label='Mã định danh '
                            name="id"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='Nhóm '
                            name="Group"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='Họ và tên'
                            name="name"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label='Vị trí công việc'
                            name="position"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* <Col span={12}>
                        <Form.Item
                            label='Email'
                            name="Email"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}

                    {/* <Col span={12}>
                        <Form.Item
                            label='Phone'
                            name="Số điện thoại"
                            rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}

                    <Col span={24}>
                        <Form.Item>
                            <Link to='/do-test-in-single' >
                                <Button type="primary" htmlType="submit">
                                    Tiếp tục
                                </Button>
                            </Link>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Col>
    );
}

export default InfoCollect;