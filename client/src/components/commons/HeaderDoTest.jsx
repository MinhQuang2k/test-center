import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col, Button, Modal } from 'antd'

function HeaderDoTest(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='white_bg'>
            <Row justify='center' className='header_do_test'>
                <Col xs={24} md={20} lg={20} xl={18} xxl={14} >
                    <Row align='middle' gutter={[16, 16]} justify='space-around'>
                        <Col>
                            <img src={require('../../assets/img/logo2.png')} />
                        </Col>
                        <Col flex={1}>
                            <b>
                                ten dot thi
                            </b>
                            <p>NetKo Solution</p>
                        </Col>
                        <Col>
                            <Button type='primary'> A +</Button>
                        </Col>
                        <Col>
                            <a><b onClick={showModal}>Hướng dẫn</b></a>
                            <Modal visible={isModalVisible} maskClosable={true} onOk={handleOk} footer={null} closable={false}>
                                <Row gutter={[16, 16]}>
                                    <Col span={10} offset={8}>
                                        <h4>
                                            Hướng dẫn
                                        </h4>
                                    </Col>
                                    <Col span={20} offset={2}>
                                        <b>
                                            1. Thời gian làm bài
                                        </b>
                                        <p>- Không giới hạn thời gian làm bài</p>

                                    </Col>

                                    <Col span={20} offset={2}>
                                        <b>
                                            2. Nội quy
                                        </b>
                                        <p>- Không nhờ người khác thi hộ.</p>
                                        <p>  - Không sao chép câu trả lời từ tài liệu trên internet.</p>

                                    </Col>

                                    <Col span={20} offset={2}>
                                        <b>
                                            3. Làm lại bài thi
                                        </b>
                                        <p>- Bài thi này có thể làm lại</p>

                                    </Col>
                                    <Col span={10} offset={10}>
                                        <Button type='primary' onClick={handleOk}> Đã hiểu </Button>
                                    </Col>

                                </Row>
                            </Modal>
                        </Col>
                        <Col>
                            <Button>Thoát</Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
            <Row justify='center' className='content_do_test'>
                <Col xs={24} md={20} lg={20} xl={18} xxl={14}>
                    <Outlet />
                </Col>
            </Row>


        </div>
    );
}

export default HeaderDoTest;