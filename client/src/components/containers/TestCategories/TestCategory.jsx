import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import TabExamGroup from './TabExamGroup';
import TabQuestionGroup from './TabQuestionGroup';
import { useTranslation } from 'react-i18next';

function TestCategory() {
  const navigate = useNavigate();
  const { t } = useTranslation('category');
  let location = useLocation();
  function callback(key) {
    navigate(key);
  }
  return (
    <div className='container tab-style'>
      <Tabs defaultActiveKey={location.pathname} onChange={callback}>
        <TabExamGroup
          tab={t('category', { ns: 'category' })}
          key='/test-categories'
        />
        <TabQuestionGroup
          tab={t('question_group', { ns: 'category' })}
          key='/question-tags'
        />
      </Tabs>
    </div>
  );
}

export default TestCategory;
