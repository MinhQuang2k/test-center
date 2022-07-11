import { useState, useEffect } from 'react';
import {
  Tooltip,
  Checkbox,
  Typography,
  Divider,
  Row,
  Space,
  Col,
  Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  DownOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

function QuestionItem({ question, index, checkAll }) {
  const { t } = useTranslation('test', 'common');
  const [showPannel, setShowPannel] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    checkAll ? setChecked(true) : setChecked(false);
  }, [checkAll]);
  const onEdit = (e) => {
    e.stopPropagation();
  };
  const onCopy = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t('do_you_want_to_duplicate_this_question', { ns: 'test' })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t('Ok', { ns: 'test' })}`,
      cancelText: `${t('Cancel', { ns: 'test' })}`,
      onOk: onOkCopy,
    });
  };
  const onDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t('do_you_want_to_remove_question_from_test', { ns: 'test' })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t('Ok', { ns: 'test' })}`,
      cancelText: `${t('Cancel', { ns: 'test' })}`,
      onOk: onOkDelete,
    });
  };
  const onCheck = (e) => {
    e.stopPropagation();
    setChecked(!checked);
  };
  const onOkCopy = () => {};
  const onOkDelete = () => {
    console.log('run');
  };
  return (
    <>
      <Space
        className={`draggable-panel ${showPannel ? 'show-panel' : ''}`}
        onClick={() => setShowPannel(!showPannel)}
      >
        <div className='draggable-pannel-item'>
          <div className='draggable-pannel-item-header'>
            <Checkbox
              checked={checked}
              onClick={(e) => e.stopPropagation()}
              onChange={onCheck}
            >
              <Typography.Title level={5}>
                {t('question', { ns: 'test' })} {index + 1}
              </Typography.Title>
            </Checkbox>
            <Divider type='vertical' style={{ height: 40 }} />
            <Typography.Text>{question.content}</Typography.Text>
          </div>
          <div className='draggable-pannel-item-option'>
            <Tooltip title={t('Edit', { ns: 'test' })}>
              <EditOutlined onClick={onEdit} />
            </Tooltip>
            <Tooltip title={t('Copy', { ns: 'test' })}>
              <CopyOutlined onClick={onCopy} />
            </Tooltip>
            <Tooltip title={t('remove', { ns: 'test' })}>
              <DeleteOutlined onClick={onDelete} />
            </Tooltip>
            <DownOutlined />
          </div>
        </div>
      </Space>
      <div className={`collapse-content ${showPannel ? 'show-panel' : ''}`}>
        <Divider />
        <Row
          gutter={[24, 24]}
          align='top'
          justify='space-around'
          style={{ marginBottom: 22 }}
        >
          <Col md={12} xs={24}>
            <Typography.Title level={5}>
              {t('answers', { ns: 'test' })}
            </Typography.Title>
            <Row>
              {question.answers?.map((answer, index) => (
                <Col span={24} key={index}>
                  <Typography.Text>
                    {t('answers', { ns: 'test' })} {index}: {answer.content}{' '}
                    {question.correctAns === 'true' ? (
                      <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : null}
                  </Typography.Text>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={12} xs={24}>
            <Typography.Title level={5}>
              {t('question_information', { ns: 'test' })}
            </Typography.Title>
            <table>
              <tbody>
                <tr>
                  <td>{t('question_group', { ns: 'test' })}</td>
                  <td>{question.questionTypeId}</td>
                </tr>
                <tr>
                  <td>{t('question_type', { ns: 'test' })}</td>
                  <td>{question.questionTypeId}</td>
                </tr>
                <tr>
                  <td>{t('point', { ns: 'test' })}</td>
                  <td>{question.score}</td>
                </tr>
                <tr>
                  <td>{t('created_at', { ns: 'test' })}</td>
                  <td>
                    {new Date(question.createdAt).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
                <tr>
                  <td>{t('time_limit', { ns: 'test' })}</td>
                  <td>
                    {question.duration ? `${question.duration} phút` : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default QuestionItem;
