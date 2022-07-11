import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Collapse,
  Input,
  Modal,
  Pagination,
  Tabs,
  notification,
  Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import examGroupsApi from '../../../api/examGroupsApi';
import {
  examSelector,
  fetchExamGroups,
  replaceFilter,
} from '../../../slices/examGroup';
import CustomPanel from './ExamPanel';
import AddExamGroup from './Forms/AddExamGroup';
import { useTranslation } from 'react-i18next';
import CategorySkeleton from '../../commons/CategorySkeleton';
import EmptyResult from '../../commons/EmptyResult';
import EmptyCategory from '../../../assets/img/has_no_test_categories.png';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
const { TabPane } = Tabs;
const { Search } = Input;

function TabExamGroup({ tab, key, ...props }) {
  const { t } = useTranslation('category');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('name') || '',
  );
  const [examModal, setExamModal] = useState(false);
  const { exams, filters, isLoading } = useSelector(examSelector);
  const [pagination, setPagination] = useState({
    page: 1,
    totalRows: 1,
    rowPerPage: 15,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(replaceFilter({ name: '', page: '1' }));
    };
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(fetchExamGroups(filters)).unwrap();
        setSearchParams(filters);
        console.log('awda', searchParams.getAll('name'));
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [filters]);
  const onChange = () => {};
  const addExamGroup = () => {
    setExamModal(!examModal);
  };
  const onSearch = () => {
    dispatch(replaceFilter({ name: searchValue, page: 1 }));
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page) => {
    dispatch(replaceFilter({ page }));
  };

  const handleAddExamGroup = async (values) => {
    try {
      if (!values.child) values.child = [];
      values.child = values.child
        .filter((child) => child !== undefined)
        .map((child) => ({ name: child }));
      await examGroupsApi.create(values);
      dispatch(replaceFilter());
      notification.success({
        message: `${t('create_exam_group_successfully', {
          ns: 'category',
        })}`,
      });
    } catch (error) {
      if (error?.response.status === 400) {
        notification.error({
          message: `${t('exam_group_name_has_already_been_taken', {
            ns: 'category',
          })}`,
        });
      } else {
        notification.error({
          message: `${t('error_create_exam_group', {
            ns: 'category',
          })}`,
        });
      }
    }
  };

  return (
    <TabPane tab={tab} key={key} {...props}>
      <div className='category-group'>
        <Search
          placeholder={t('search_category', { ns: 'category' })}
          style={{ width: 400 }}
          loading={isLoading}
          onSearch={onSearch}
          onChange={handleSearchChange}
          value={searchValue}
        />
        <Button
          className='btn-primary'
          type='primary'
          size='large'
          icon={<PlusCircleOutlined />}
          onClick={addExamGroup}
        >
          {t('new_group_category', { ns: 'category' })}
        </Button>
      </div>
      {isLoading ? (
        Array.from(Array(10).keys()).map((_, index) => (
          <CategorySkeleton key={index} />
        ))
      ) : exams.length <= 0 ? (
        <EmptyResult
          message={t('empty_category', { ns: 'category' })}
          image={EmptyCategory}
        />
      ) : (
        <Collapse expandIconPosition='right' ghost onChange={onChange}>
          {exams.map((exam, index) => (
            <CustomPanel exam={exam} key={index} index={index + 1} />
          ))}
        </Collapse>
      )}
      <Modal
        title={t('create_category', { ns: 'category' })}
        visible={examModal}
        onOk={() => setExamModal(false)}
        onCancel={() => setExamModal(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <AddExamGroup
          onCancel={() => setExamModal(false)}
          handleAddExamGroup={handleAddExamGroup}
        />
      </Modal>
      <Row justify='center' align='center'>
        <Pagination
          defaultCurrent={1}
          current={pagination.page}
          onChange={handlePageChange}
          total={pagination.totalRows}
          pageSize={pagination.rowPerPage}
          hideOnSinglePage
        />
      </Row>
    </TabPane>
  );
}

export default TabExamGroup;
