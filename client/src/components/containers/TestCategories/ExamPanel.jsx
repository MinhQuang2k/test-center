import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Modal, Tooltip, notification } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import examGroupsApi from '../../../api/examGroupsApi';
import subExamGroupsApi from '../../../api/subExamGroupsApi';
import { replaceFilter } from '../../../slices/examGroup';
import ExamChildItem from './ExamChildItem';
import AddExamChild from './Forms/AddExamChild';
import EditExamGroup from './Forms/EditExamGroup';
import { useTranslation } from 'react-i18next';
const { Panel } = Collapse;

function CustomPanel({ index, exam, ...props }) {
  const { t } = useTranslation('category', 'common');
  const [editExamGroup, setEditExamGroup] = useState(false);
  const [addChildExamModal, setAddChildExamModal] = useState(false);

  const dispatch = useDispatch();
  const onDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: `${t('are_you_sure_delete_category', { ns: 'category' })} ${
        exam.name
      }`,
      icon: <ExclamationCircleOutlined />,
      okText: t('button.ok', { ns: 'common' }),
      cancelText: t('button.cancel', { ns: 'common' }),
      onOk: onOk,
    });
  };
  const onOk = async () => {
    try {
      await examGroupsApi.remove(exam.id);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('delete_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      if (error?.response.status === 400)
        notification.error({
          message: `${t('sub_exam_group_are_not_empty', {
            ns: 'category',
          })}`,
        });
      else
        notification.error({
          message: `${t('error_delete_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };

  const handleAddExamChild = async (values) => {
    try {
      const childExam = { name: values.name, examGroupId: exam.id };
      await subExamGroupsApi.create(childExam);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('create_sub_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      console.log(error);
      if (error?.response.status === 400) {
        notification.error({
          message: `${t('sub_exam_group_name_has_already_been_taken', {
            ns: 'category',
          })}`,
        });
      } else
        notification.error({
          message: `${t('error_create_sub_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };
  const handleEditExamGroup = async (values) => {
    try {
      await examGroupsApi.update(exam.id, values);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('edit_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      console.log(error);
      if (error?.response.status === 400)
        notification.error({
          message: `${t('exam_group_name_has_already_been_taken', {
            ns: 'category',
          })}`,
        });
      else
        notification.error({
          message: `${t('error_edit_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };

  const onEdit = (e) => {
    e.stopPropagation();
    setEditExamGroup(true);
  };
  return (
    <>
      <Panel
        key={index}
        {...props}
        extra={[
          <Tooltip
            key={index + 2000}
            title={t('button.edit', { ns: 'common' })}
          >
            <EditOutlined onClick={onEdit} />
          </Tooltip>,
          <Tooltip
            key={index + 1000}
            title={t('button.delete', { ns: 'common' })}
          >
            <DeleteOutlined onClick={onDelete} />
          </Tooltip>,
        ]}
        header={
          <div className='pannel-header'>
            <h4 className='header'>{exam.name}</h4>
            <p className='child'>
              {exam.child.map((child, index) => (
                <span key={index + 200}>
                  {child.name}
                  {index + 1 === exam.child.length ? '' : ', '}
                </span>
              ))}
            </p>
          </div>
        }
      >
        {exam.child.map((child, index) => (
          <ExamChildItem child={child} key={index} exam={exam} />
        ))}
        <Button
          icon={<PlusCircleOutlined />}
          type='primary'
          className='btn-primary-inverse'
          onClick={() => setAddChildExamModal(true)}
        >
          {t('new_sub_category2', { ns: 'category' })}
        </Button>
      </Panel>
      <Modal
        visible={addChildExamModal}
        onOk={() => setAddChildExamModal(false)}
        onCancel={() => setAddChildExamModal(false)}
        title={t('new_sub_category1', { ns: 'category' })}
        style={{ top: 25 }}
        footer={null}
      >
        <AddExamChild
          onCancel={() => setAddChildExamModal(false)}
          handleAddExamChild={handleAddExamChild}
        />
      </Modal>
      <Modal
        title={t('update_category', { ns: 'category' })}
        visible={editExamGroup}
        onOk={() => setEditExamGroup(false)}
        onCancel={() => setEditExamGroup(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <EditExamGroup
          onCancel={() => setEditExamGroup(false)}
          exam={exam}
          handleEditExamGroup={handleEditExamGroup}
        />
      </Modal>
    </>
  );
}
export default CustomPanel;
