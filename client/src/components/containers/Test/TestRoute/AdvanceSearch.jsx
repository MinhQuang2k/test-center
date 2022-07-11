import { useRef, useState, useEffect } from 'react';
import { TreeSelect, Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTest, reset } from '../../../../slices/test';
import { examSelector } from '../../../../slices/examGroup';
const { TreeNode } = TreeSelect;
const treeData = [
  {
    title: 'Đề thường',
    value: 'normal',
  },
  {
    title: 'Đề iq',
    value: 'iq',
  },
  {
    title: 'Đề IT',
    value: 'it',
  },
  {
    title: 'Đề MI',
    value: 'mi',
  },
  {
    title: 'Đề MBTI',
    value: 'mbti',
  },
  {
    title: 'Đề Toeic',
    value: 'toeic',
  },
  {
    title: 'Đề disc',
    value: 'disc',
  },
];
function AdvanceSearch({ closeAdvanceSearch, query, setQuery }) {
  const { test_types, sort_by, keyword, subExamGroupId, page } = query;
  const { t } = useTranslation('test');
  const dispatch = useDispatch();
  const categoryRef = useRef();
  const sortRef = useRef();
  const listRef = useRef();
  const { exams } = useSelector(examSelector);
  const [category, setCategory] = useState(subExamGroupId);
  const [sortby, setSortBy] = useState(sort_by);
  const [list, setList] = useState(test_types);
  useEffect(() => {
    setList(test_types);
    return () => dispatch(reset());
  }, [test_types]);
  const onChangeCategory = (value) => {
    setCategory(value);
  };
  const onChangeSort = (value) => {
    setSortBy(value);
  };
  const onChangeList = (value) => {
    setList(value);
  };
  const onClick = () => {
    query.test_types = list;
    query.sort_by = sortby;
    query.subExamGroupId = category;
    setQuery(query);
    dispatch(getAllTest(query));
  };
  return (
    <div className='custom-menu test-section'>
      <div className='custom-menu-heading'>
        {t('add_filter_options', { ns: 'test' })}
      </div>
      <div className='custom-menu-body'>
        <TreeSelect
          style={{ width: '100%' }}
          value={category === '' ? null : category}
          dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
          placeholder={t('all_categories', { ns: 'test' })}
          treeDefaultExpandAll
          onChange={onChangeCategory}
          onClick={(e) => (categoryRef.current = e.target)}
        >
          <TreeNode value='' title='tất cả danh mục'></TreeNode>
          {exams.map((exam) => (
            <TreeNode
              value={exam.id + exam.name}
              title={exam.name}
              selectable={false}
              key={exam.id + exam.name}
            >
              {exam.child?.map((subExam) => (
                <TreeNode
                  value={subExam.id}
                  title={subExam.name}
                  key={subExam.id}
                ></TreeNode>
              ))}
            </TreeNode>
          ))}
        </TreeSelect>
        <Select
          placeholder={t('recently_added', { ns: 'test' })}
          defaultValue={sortby}
          onChange={onChangeSort}
          onClick={(e) => (sortRef.current = e.target)}
        >
          <Select.Option value='recent'>
            {t('recently_added', { ns: 'test' })}
          </Select.Option>
          <Select.Option value='ascending'>
            {t('alphabet', { ns: 'test' })}
          </Select.Option>
        </Select>
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={list}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder='Please select'
          multiple
          treeData={treeData}
          treeDefaultExpandAll
          onChange={onChangeList}
          onClick={(e) => (listRef.current = e.target)}
        ></TreeSelect>
      </div>
      <div className='custom-menu-footer'>
        <Button onClick={onClick} className='btn-primary'>
          {t('search', { ns: 'test' })}
        </Button>
      </div>
      <div className='custom-menu-close' onClick={closeAdvanceSearch}>
        <CloseOutlined />
      </div>
    </div>
  );
}

export default AdvanceSearch;
