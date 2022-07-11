import { Row, Col, Timeline, Space } from 'antd';
import {
  PlayCircleOutlined,
  FormOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
function TestTimeLine() {
  const { t } = useTranslation('test');
  return (
    <Col span={24}>
      <Row className="content timeline" gutter={[24, 24]} align="top">
        <Timeline>
          <Timeline.Item>
            <Space direction="vertical">
              <Space direction="horizontal">
                <ClockCircleOutlined />
                12-05-2022 10:24:54
              </Space>
              <Space direction="horizontal">
                <PlayCircleOutlined />
                {t('examinee_start_doing_the_test', { ns: 'test' })}
              </Space>
            </Space>
          </Timeline.Item>
          <Timeline.Item>
            <Space direction="vertical">
              <Space direction="horizontal">
                <ClockCircleOutlined />
                12-05-2022 10:24:54
              </Space>
              <Space direction="horizontal">
                <FormOutlined />
                {t('examinee_starts_doing_question', { ns: 'test' })} 1
              </Space>
            </Space>
          </Timeline.Item>
          <Timeline.Item>
            <Space direction="vertical">
              <Space direction="horizontal">
                <FormOutlined />
                12-05-2022 10:24:58
              </Space>
              <Space direction="horizontal">
                <PlayCircleOutlined />
                {t('examinee_starts_doing_question', { ns: 'test' })} 2
              </Space>
            </Space>
          </Timeline.Item>
          <Timeline.Item>
            <Space direction="vertical">
              <Space direction="horizontal">
                <ClockCircleOutlined />
                12-05-2022 10:24:54
              </Space>
              <Space direction="horizontal">
                <PauseCircleOutlined />
                {t('examinee_finish_doing_the_test', { ns: 'test' })}
              </Space>
            </Space>
          </Timeline.Item>
        </Timeline>
      </Row>
    </Col>
  );
}

export default TestTimeLine;
