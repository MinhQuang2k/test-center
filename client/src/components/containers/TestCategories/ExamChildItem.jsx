import { Divider, Modal, Button, Typography, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MoveExamChild from './Forms/MoveExamChild';
import { useState, useEffect } from 'react';
import subExamGroupsApi from '../../../api/subExamGroupsApi';
import { useDispatch } from 'react-redux';
import { replaceFilter } from '../../../slices/examGroup';
import { useTranslation } from 'react-i18next';

const { Paragraph } = Typography;

function ExamChildItem({ child, exam }) {
  const { t } = useTranslation('category', 'common');
  const dispatch = useDispatch();
  const [moveChildExamModal, setMoveChildExamModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const onRemove = () => {
    Modal.confirm({
      title: `${t('are_you_sure_delete_sub_category', { ns: 'category' })} ${
        child.name
      }`,
      icon: <ExclamationCircleOutlined />,
      okText: t('button.ok', { ns: 'common' }),
      cancelText: t('button.cancel', { ns: 'common' }),
      onOk: onOkRemove,
    });
  };
  const onOkRemove = async () => {
    try {
      console.log(child.name);
      await subExamGroupsApi.remove(child.id);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('delete_sub_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      console.log(error);
      if (error?.response.status === 400)
        notification.error({
          message: `${t('sub_exam_group_are_not_empty2', {
            ns: 'category',
          })}`,
        });
      else
        notification.error({
          message: `${t('error_delete_sub_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };
  const onMove = () => {
    setMoveChildExamModal(true);
  };
  const switchEditMode = () => {
    setEditMode(!editMode);
  };

  const handelMoveExamChild = async (values) => {
    try {
      const params = { newExamGroupsId: values.newGroup };
      await subExamGroupsApi.move(child.id, params);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('move_sub_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      console.log(error);
      if (error?.response.status === 400) {
        notification.error({
          message: `${t(
            'sub_exam_group_name_has_already_been_taken_in_new_group',
            {
              ns: 'category',
            },
          )}`,
        });
      } else
        notification.error({
          message: `${t('error_move_sub_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };
  const onEditEnd = async () => {};
  const handleOnChange = async (e) => {
    try {
      await subExamGroupsApi.update(child.id, { name: e });
      dispatch(replaceFilter());
      notification.success({
        message: `${t('edit_sub_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
      setEditMode(!editMode);
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
          message: `${t('error_edit_sub_exam_group', {
            ns: 'category',
          })}`,
        });
    }
  };
  return (
    <>
      <Divider />
      <div className='test-item'>
        <Paragraph
          editable={{
            onChange: handleOnChange,
            editing: editMode,
            onEnd: async () => {
              await onEditEnd();
            },
          }}
          className='header'
        >
          {child.name}
        </Paragraph>
        {editMode ? (
          <div className='edit-mode'>
            <Button className='btn-gray' onClick={switchEditMode}>
              {t('button.cancel', { ns: 'common' })}
            </Button>
            <Button className='btn-primary' onClick={onEditEnd}>
              {t('button.update', { ns: 'common' })}
            </Button>
          </div>
        ) : (
          <div className='option'>
            <div className='edit' onClick={switchEditMode}>
              {t('button.edit', { ns: 'common' })}
            </div>
            <div className='move' onClick={onMove}>
              {t('button.move', { ns: 'common' })}
            </div>
            <div className='delete' onClick={onRemove}>
              {t('button.delete', { ns: 'common' })}
            </div>
          </div>
        )}
      </div>
      <Modal
        title={t('move_sub_category', { ns: 'category' })}
        visible={moveChildExamModal}
        onCancel={() => setMoveChildExamModal(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <MoveExamChild
          onCancel={() => setMoveChildExamModal(false)}
          handelMoveExamChild={handelMoveExamChild}
          child={child}
          exam={exam}
        />
      </Modal>
    </>
  );
}

export default ExamChildItem;
