import {
  CaretDownOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Checkbox, Collapse, Divider, Modal, Tooltip } from 'antd';
import QuestionDetail from './QuestionDetail';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

const { Panel } = Collapse;

function CustomPanel({ index, question, onCheck, ...props }) {
  const { t } = useTranslation('bank');
  const onDelete = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: t('Do_you_want_to_remove_question', { ns: 'bank' }),
      icon: <ExclamationCircleOutlined />,
      okText: t('Yes_Remove_it', { ns: 'bank' }),
      cancelText: t('No_Keep_it', { ns: 'bank' }),
      onOk: onOk,
    });
  };
  const onOk = () => { };

  const onCopy = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: t('Do_you_want_to_duplicate_this_question', { ns: 'bank' }),
      icon: <ExclamationCircleOutlined />,
      okText: t('Yes_duplicate_it', { ns: 'bank' }),
      cancelText: t('No', { ns: 'bank' }),
      onOk: onOk,
    });
  };

  const handleOnCheck = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      onCheck({
        id: parseInt(e.target.value),
        checked: e.target.checked,
      });
    }
  };
  return (
    <Panel
      showArrow={false}
      key={index}
      {...props}
      extra={[
        <Tooltip key={index + 3000} title={t('Update', { ns: 'bank' })}>
          <Link to="/bank/question/:id/edit" state={{ update: true }}><EditOutlined /></Link>
        </Tooltip>,
        <Tooltip key={index + 2000} title={t('Duplicate', { ns: 'bank' })}>
          <CopyOutlined onClick={onCopy} />
        </Tooltip>,
        <Tooltip key={index + 1000} title={t('Delete', { ns: 'bank' })}>
          <DeleteOutlined onClick={onDelete} />
        </Tooltip>,
        <CaretDownOutlined key={index + 4000} />,
      ]}
      header={
        <div onClick={handleOnCheck} className='panel--header'>
          <Checkbox value={question.id} checked={Boolean(question.checked)}>
            <span className='question--number'>{`${t('Question', { ns: 'bank' })} ${index}`}</span>{' '}
            <Divider type='vertical' />
            {question.name}
          </Checkbox>
        </div>
      }
    >
      <QuestionDetail question={question} />
    </Panel>
  );
}
export default CustomPanel;
