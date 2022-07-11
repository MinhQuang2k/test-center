import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import CustomPanel from './CustomPanel';
import { useTranslation } from 'react-i18next';

const defaultQuestionList = [
  {
    id: 1,
    name: 'asda',
  },
  {
    id: 2,
    name: 'asda1',
  },
  {
    id: 3,
    name: 'asda2',
  },
];
const { confirm } = Modal;
function QuestionList() {
  const { t } = useTranslation('bank');
  const [questionList, setQuestionList] = useState(defaultQuestionList);
  const [checkAll, setCheckAll] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const showConfirm = (e, deleteList) => {
    confirm({
      title: t('Notification', { ns: 'bank' }),
      icon: <ExclamationCircleOutlined />,
      content: t('Are_you_sure_want_to_remove_selected_questions', { ns: 'bank' }),
      okText: t('Yes', { ns: 'bank' }),
      cancelText: t('Cancel', { ns: 'bank' }),

      onOk() {
        console.log(deleteList);
        e.target.value = 'option';
      },

      onCancel() {
        e.target.value = 'option';
      },
    });
  };
  useEffect(() => {
    setShowOption(
      questionList.findIndex((question) => !!question.checked) !== -1,
    );
    setCheckAll(questionList.findIndex((question) => !question.checked) === -1);
  }, [questionList]);

  const onCheck = (value) => {
    const newQuestionList = questionList.map((question) => {
      if (question.id !== value.id) return question;
      return { ...question, checked: value.checked };
    });
    setQuestionList(newQuestionList);
  };

  const onCheckAllChange = (e) => {
    const newQuestionList = questionList.map((question) => ({
      ...question,
      checked: e.target.checked,
    }));
    setQuestionList(newQuestionList);
    setCheckAll(e.target.checked);
  };
  const handleMassDelete = (e) => {
    if (e.target.value === 'delete') {
      const deleteList = questionList.filter((question) =>
        Boolean(question.checked),
      );
      showConfirm(e, deleteList);
    }
  };
  return (
    <div className='question-list'>
      <Checkbox
        onChange={onCheckAllChange}
        checked={checkAll}
        className='checkAll'
      >
        {checkAll ? t('Uncheck_all', { ns: 'bank' }) : t('Check_all', { ns: 'bank' })}
      </Checkbox>
      {showOption && (
        <select onChange={handleMassDelete} className='check-option'>
          <option value='option'>{t('Select', { ns: 'bank' })}</option>
          <option value='delete'>{t('Delete', { ns: 'bank' })}</option>
        </select>
      )}
      <Collapse ghost>
        {questionList.map((question, index) => (
          <CustomPanel
            key={index}
            question={question}
            index={index + 1}
            onCheck={onCheck}
          />
        ))}
      </Collapse>
    </div>
  );
}

export default QuestionList;
