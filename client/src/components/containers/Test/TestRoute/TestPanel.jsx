import React from 'react'
import { Collapse, Tooltip, Divider, Modal, Space, Typography } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ScheduleOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  FolderOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import TestItem from './TestItem'
import CustomSkeleton from '../../../commons/CustomSkeleton'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { deleteTest } from '../../../../slices/test'
const { Panel } = Collapse
function TestPanel({ test, index, ...props }) {
  const { t } = useTranslation('test', 'common')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onEditExam = (e) => {
    e.stopPropagation()
    navigate(`/tests/${test.id}/edit`)
  }
  const onCreateExam = (e) => {
    e.stopPropagation()
    navigate('/test-campaigns')
  }
  const onOkdelete = () => {
    dispatch(deleteTest(test.id))
  }
  const onDeleteExam = (e) => {
    e.stopPropagation()
    Modal.confirm({
      title: `${t('do_you_want_to_remove_test', { ns: 'test' })}`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t('button.yes', { ns: 'common' })}`,
      cancelText: `${t('button.cancel', { ns: 'common' })}`,
      onOk: onOkdelete,
    })
  }
  //loading state
  if (false) return <CustomSkeleton />
  return (
    <Panel
      key={index + 1}
      {...props}
      extra={[
        <Tooltip
          key={index + 100}
          title={t('update_test_infomation', { ns: 'test' })}
        >
          <EditOutlined onClick={onEditExam} />
        </Tooltip>,
        <Tooltip
          key={index + 200}
          title={t('create_new_test_campaign', { ns: 'test' })}
        >
          <ExportOutlined onClick={onCreateExam} />
        </Tooltip>,
        <Tooltip key={index + 300} title={t('button.delete', { ns: 'common' })}>
          <DeleteOutlined onClick={onDeleteExam} />
        </Tooltip>,
      ]}
      header={
        <div className="pannel-header">
          <Typography.Title level={4}>{test.name}</Typography.Title>
          <div className="child-details">
            <div className="child-items">
              <ScheduleOutlined />
              <p>
                {new Date(test.createdAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="child-items">
              <LinkOutlined />
              <p>
                {test.totalExams} {t('test_campaigns', { ns: 'test' })}
              </p>
            </div>
            <div className="child-items">
              <QuestionCircleOutlined />
              <p>
                {test.totalQuestions} {t('questions', { ns: 'test' })}
              </p>
            </div>
            <div className="child-items">
              <TrophyOutlined />
              <p>
                {test.totalScore} {t('score', { ns: 'test' })}
              </p>
            </div>
            <div className="child-items">
              <FolderOutlined />
              <p>{test.SubExamGroup.name}</p>
            </div>
          </div>
        </div>
      }
    >
      {test.totalExams === 0 ? (
        <>
          <Divider />
          <Space className="" style={{ height: 60 }} direction="vertical">
            <p>{t('this_test_currently_has_no_campaigns', { ns: 'test' })}</p>
            <Link
              to="/test-campaigns"
              className="btn-primary"
              style={{ padding: '8px' }}
            >
              {t('create_test_campaign', { ns: 'test' })}
            </Link>
          </Space>
        </>
      ) : (
        test.Examinations.map((exam, index) => (
          <TestItem key={index} exam={exam} />
        ))
      )}
    </Panel>
  )
}

export default TestPanel
