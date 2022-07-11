import { Button, Col, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Required from '../../../commons/Required';

function JoinTest(props) {
    const accessCodeLink = true

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Col>
            <Form
                name="basic"
                layout='vertical'
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label='Mã truy cập'
                    name="username"
                    rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
                >
                    <Input />

                </Form.Item>


                <Form.Item htmlType="submit">
                    <Link to='info-collect' ><Button type='primary'>Tiep tuc</Button></Link>
                </Form.Item>
            </Form>
        </Col>
    );
}

export default JoinTest;