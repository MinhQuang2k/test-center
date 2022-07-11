import { useState } from 'react';
import { Row, Col, Typography, Divider, Button, Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  AimOutlined,
  InboxOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import ShareResult from './Forms/ShareResult';
import { useTranslation } from 'react-i18next';
function TestInfo() {
  const { t } = useTranslation('test');
  const [share, setShare] = useState(false);
  return (
    <>
      <Col span={24}>
        <Row align="middle" gutter={[24, 8]} className="content">
          <Col span={24}>
            <Typography.Title level={5}>tên người làm bài</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">
              <InboxOutlined style={{ marginRight: 6 }} />
              sdsđsd
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">
              <AimOutlined style={{ marginRight: 6 }} />
              127.0.0.1
            </Typography.Text>
          </Col>
          <Divider style={{ margin: '4px 0' }} />
          <Col className="test-info-score">
            <Row align="middle" justify="space-between" gutter={[24, 8]}>
              <Col span={12}>
                <Typography.Title level={4}>3/6đ</Typography.Title>
              </Col>
              <Col span={12}>
                <div className="bagde bagde-green">
                  <ExclamationCircleOutlined />
                  <span>Đạt</span>
                </div>
              </Col>
              <Col span={17}>
                {t('completion_percentage', { ns: 'test' })} 50.0%
              </Col>
              <Col span={7}>
                <progress value={40} max={100} />
              </Col>
              <Col span={17}>
                {t('total_correct_questions_(Not_include_essay_questions)', {
                  ns: 'test',
                })}
              </Col>
              <Col span={7}>1/4</Col>
              <Col span={17}>
                {t('number_of_essay_questions', { ns: 'test' })}
              </Col>
              <Col span={7}>1</Col>
              <Col span={17}>{t('duration', { ns: 'test' })}</Col>
              <Col span={7}>00:00:15</Col>
              <Button
                onClick={() => setShare(true)}
                className="btn-primary"
                type="primary"
                size="large"
                icon={<ShareAltOutlined />}
              >
                {t('share_test_result', { ns: 'test' })}
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
      <Modal
        title={t('send_results_by_email', { ns: 'test' })}
        onCancel={() => setShare(false)}
        visible={share}
        style={{ top: 25 }}
        className="modal-flexible"
        footer={null}
      >
        <ShareResult
          closeModal={() => {
            setShare(false);
          }}
        />
      </Modal>
    </>
  );
}

export default TestInfo;
