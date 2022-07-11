import {
  CheckCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Checkbox,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
function DragItem({ index, question, checkAll, ...props }) {
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
      okText: `${t('button.yes', { ns: 'common' })}`,
      cancelText: `${t('button.cancel', { ns: 'common' })}`,
      onOk: onOkCopy,
    });
  };
  const onDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t('do_you_want_to_remove_question_from_test', { ns: 'test' })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t('button.yes', { ns: 'common' })}`,
      cancelText: `${t('button.cancel', { ns: 'common' })}`,
      onOk: onOkDelete,
    });
  };
  const onCheck = (e) => {
    e.stopPropagation();
    setChecked(!checked);
  };
  const onOkCopy = () => {};
  const onOkDelete = () => {};
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
                {t('Question', { ns: 'test' })} {index + 1}
              </Typography.Title>
            </Checkbox>
            <Divider type='vertical' style={{ height: 40 }} />
            <Typography.Text>{question.name}</Typography.Text>
          </div>
          <div className='draggable-pannel-item-option'>
            <Tooltip title={t('button.update', { ns: 'common' })}>
              <EditOutlined onClick={onEdit} />
            </Tooltip>
            <Tooltip title={t('button.duplicate', { ns: 'common' })}>
              <CopyOutlined onClick={onCopy} />
            </Tooltip>
            <Tooltip title={t('button.delete', { ns: 'common' })}>
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
                    {question.correctAns ? (
                      <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : (
                      ''
                    )}
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
                  <td>{question.duration}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DragItem;
