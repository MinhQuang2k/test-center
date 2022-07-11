import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function ManageCertificate(props) {
    const { t } = useTranslation('account');

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const showModalDelete = () => {
        Modal.confirm({
            title: t('Notification', { ns: 'testCampaign' }),
            icon: <ExclamationCircleOutlined />,
            content: t('notifi_delete', { ns: 'testCampaign' }),
            okText: t('yes', { ns: 'testCampaign' }),
            cancelText: t('no', { ns: 'testCampaign' }),
            onOk() {
                //console.log('delete') 
            },
            maskClosable: true
        })
    }

    const showModalCopy = () => {
        Modal.confirm({
            title: t('duplicate', { ns: 'testCampaign' }),
            icon: <ExclamationCircleOutlined />,
            content: t('notifi_duplicate', { ns: 'testCampaign' }),
            okText: t('Yes_duplicate_it', { ns: 'testCampaign' }),
            cancelText: t('no', { ns: 'testCampaign' }),
            onOk() {
                //console.log('copy') 
            },
            maskClosable: true
        })
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Row align='middle'>
                        <Col flex={1}>
                            <h6>{t('Change_password', { ns: 'account' })}</h6>
                        </Col>

                        <Col>
                            <Link to='/account/manage-certificates/create'>
                                <Button type='primary'>{t('Create_certificate', { ns: 'account' })}</Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <table>
                        <tr>
                            <th>#</th>
                            <th>{t('NAME', { ns: 'account' })}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>tests</td>
                            <td>
                                <Tooltip placement="top" title={t('edit', { ns: 'account' })}>
                                    <Link to={`/`}><Button type="link"><EditOutlined /></Button></Link>

                                </Tooltip>
                                <Tooltip placement="top" title={t('duplicate', { ns: 'account' })}>
                                    <Button type="link" onClick={showModalCopy}><CopyOutlined /></Button>

                                </Tooltip>
                                <Tooltip placement="top" title={t('delete', { ns: 'account' })} >
                                    <Button type="link" onClick={showModalDelete}><DeleteOutlined /></Button>
                                </Tooltip>
                            </td>
                        </tr>
                    </table>
                </Col>
            </Row>
        </div>
    );
}

export default ManageCertificate;