import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function AddMenu({ addRandomQues, closeDropDown }) {
  const { t } = useTranslation('test');
  const randomQues = () => {
    addRandomQues();
    closeDropDown();
  };
  return (
    <Menu>
      <Menu.Item key={1}>
        <Link to='/questions'>{t('add_new_question', { ns: 'test' })}</Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to='/questions'>{t('my_question_bank', { ns: 'test' })}</Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to='/questions'>{t('import_spreadsheet', { ns: 'test' })}</Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <Link to='/questions'>
          {t('import_from_markdown_file', { ns: 'test' })}
        </Link>
      </Menu.Item>
      <Menu.Item key={5}>
        <span onClick={randomQues}>{t('random_question', { ns: 'test' })}</span>
      </Menu.Item>
    </Menu>
  );
}

export default AddMenu;
