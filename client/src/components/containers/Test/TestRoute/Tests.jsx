import {
  Input,
  Collapse,
  Button,
  Modal,
  Tag,
  Row,
  Col,
  Typography,
  Pagination,
  Popover,
  notification,
  Empty,
} from 'antd';
import { PlusCircleOutlined, CloseCircleFilled } from '@ant-design/icons';
import AddTest from './Forms/AddTest';
import { useState, useEffect } from 'react';
import TestPanel from './TestPanel';
import AdvanceSearch from './AdvanceSearch';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { testSelector, getAllTest, reset } from '../../../../slices/test';
import CustomSkeleton from '../../../commons/CustomSkeleton';
const { Search } = Input;

function Tests() {
  const { t } = useTranslation('test');
  const [addTestModal, setAddTestModal] = useState(false);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [query, setQuery] = useState({
    keyword: '',
    subExamGroupId: '',
    test_types: ['normal', 'it', 'toeic', 'mbti', 'mi', 'disc', 'iq'],
    sort_by: 'recent',
    page: 1,
  });
  const dispatch = useDispatch();
  const { tests, isLoading, isError, message, pagination } =
    useSelector(testSelector);
  useEffect(() => {
    (async () => {
      dispatch(getAllTest(query));
    })();
    return () => dispatch(reset());
    //eslint-disable-next-line
  }, []);
  const onSearch = (values) => {
    const q = { ...query, keyword: values };
    setQuery(q);
    dispatch(getAllTest(q));
  };

  const handleCloseTag = (removedTag) => {
    const newTags = query.test_types.filter((tag) => tag !== removedTag);
    query.test_types = newTags;
    setQuery(query);
    dispatch(getAllTest(query));
  };
  const handlePageChange = (page) => {
    query.page = page;
    setQuery(query);
    dispatch(getAllTest(query));
  };
  const advanceSearch = (newState) => {
    setShowAdvanceSearch(newState);
    setClicked(true);
  };
  const triggerAdvanceSearchTag = () => {
    setClicked(false);
  };
  const triggerAdvanceSearchTag1 = () => {
    setShowAdvanceSearch(true);
    setClicked(true);
  };
  return (
    <div className='container test-section tab-style'>
      <Row justify='space-between' align='center'>
        <Col>
          <Typography.Title level={3}>
            {t('tests', { ns: 'test' })}
          </Typography.Title>
        </Col>
        <Col>
          <Button
            className='btn-primary'
            type='primary'
            size='large'
            icon={<PlusCircleOutlined />}
            onClick={() => setAddTestModal(true)}
          >
            {t('create_new_test', { ns: 'test' })}
          </Button>
        </Col>
      </Row>
      <Row
        gutter={24}
        align='middle'
        justify='start'
        style={{ justifyContent: 'flex-start', marginBottom: 12 }}
      >
        <Col
          md={10}
          xs={12}
          className='category-group'
          style={{ marginBottom: 0 }}
        >
          <Search
            placeholder={t('enter_keyword_to_search_tests', { ns: 'test' })}
            loading={isLoading}
            onSearch={onSearch}
          />
        </Col>
        <Col md={4} xs={12}>
          <Popover
            placement='topLeft'
            content={
              <AdvanceSearch
                query={query}
                setQuery={setQuery}
                closeAdvanceSearch={() => setShowAdvanceSearch(false)}
              />
            }
            trigger='click'
            visible={showAdvanceSearch}
            onVisibleChange={advanceSearch}
          >
            <Button className='btn-outline-primary' type='primary' size='large'>
              {t('advanced_filters', { ns: 'test' })}
            </Button>
          </Popover>
        </Col>
      </Row>
      <div>
        {query.test_types.map((tag) => (
          <Tag
            closable={query.test_types.length !== 1}
            key={tag}
            closeIcon={<CloseCircleFilled />}
            onClose={() => handleCloseTag(tag)}
          >
            {t('test', { ns: 'test' })} {tag}
          </Tag>
        ))}
        <Tag
          onClick={clicked ? triggerAdvanceSearchTag : triggerAdvanceSearchTag1}
          className='tag-btn'
        >
          {query.subExamGroupId === ''
            ? t('category_all_categories', { ns: 'test' })
            : `${t('category', { ns: 'test' })} ${query.subExamGroupId}`}
        </Tag>
        <Tag
          onClick={clicked ? triggerAdvanceSearchTag : triggerAdvanceSearchTag1}
          className='tag-btn'
        >
          {query.sort_by === 'recent'
            ? t('sort_added_recently', { ns: 'test' })
            : t('sort_az', { ns: 'test' })}
        </Tag>
      </div>
      {isLoading
        ? Array.from(Array(10).keys()).map((_, index) => (
            <CustomSkeleton key={index} />
          ))
        : null}
      {isError ? (
        <h3>
          {message === 'empty' && <Empty></Empty>}
          <Collapse expandIconPosition='right' ghost>
            {tests.map((test, index) => (
              <TestPanel test={test} key={index} index={index} />
            ))}
          </Collapse>
        </h3>
      ) : (
        <Collapse expandIconPosition='right' ghost>
          {tests.map((test, index) => (
            <TestPanel test={test} key={index} index={index} />
          ))}
        </Collapse>
      )}

      <Modal
        title={t('create_new_test', { ns: 'test' })}
        onOk={() => setAddTestModal(false)}
        onCancel={() => setAddTestModal(false)}
        visible={addTestModal}
        style={{ top: 25 }}
        footer={null}
      >
        <AddTest closeModal={() => setAddTestModal(false)} />
      </Modal>
      <Row justify='center' align='middle'>
        <Pagination
          defaultCurrent={1}
          current={pagination.page}
          onChange={handlePageChange}
          total={pagination.totalRows}
          pageSize={pagination.rowPerPage}
          hideOnSinglePage={pagination.totalRows < pagination.rowPerPage}
        />
      </Row>
    </div>
  );
}

export default Tests;
