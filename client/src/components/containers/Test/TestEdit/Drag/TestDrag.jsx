import { useState, useEffect } from 'react';
import { Row, Col, Typography, Dropdown, Checkbox, Select, Modal } from 'antd';
import { Link } from 'react-router-dom';
import {
  QuestionCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  ForkOutlined,
  FileDoneOutlined,
  PlusCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragItem from './DragItem';
import AddMenu from '../Menu/AddMenu';
import AddRandomQuestion from '../Forms/AddRandomQuestion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { testSelector, getTest } from '../../../../../slices/test.js';
import { useParams } from 'react-router-dom';
function TestDrag() {
  const { t } = useTranslation('test', 'common');
  const [dragList, setDragList] = useState();
  const dispatch = useDispatch();
  const { test } = useSelector(testSelector);
  const param = useParams();
  const [checkAll, setCheckAll] = useState(false);
  const [checkOption, setCheckOption] = useState('none');
  const [randomQues, setRandomQues] = useState(false);
  const [addQuesDropDown, setAddQuesDropDown] = useState(false);
  useEffect(() => {
    if (!test) {
      dispatch(getTest(param.id));
    }
    if (test.Sections) setDragList(test.Sections[0].questions);
    //eslint-disable-next-line
  }, []);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(dragList);
    const reOrderItem = items.splice(result.source.index, 1)[0];
    items.splice(result.destination.index, 0, reOrderItem);
    setDragList(items);
  };
  const onCheck = (e) => {
    setCheckAll(e.target.checked);
  };
  const onSelect = (e) => {
    if (e === 'remove') {
      setCheckOption('remove');
      Modal.confirm({
        title: `${t('do_you_want_to_remove_selected_question', {
          ns: 'test',
        })}`,
        icon: <ExclamationCircleOutlined />,
        okText: `${t('Ok', { ns: 'test' })}`,
        cancelText: `${t('Cancel', { ns: 'test' })}`,
        onOk: onOkDelete,
        afterClose: () => {
          setCheckOption('none');
          Modal.destroyAll();
        },
      });
    }
  };
  const onOkDelete = (e) => {
    setCheckOption('none');
    Modal.destroyAll();
  };
  return (
    <>
      <Col span={24}>
        <Row gutter={[24, 24]} align='middle' justify='space-between'>
          <Col span={14}>
            <Row gutter={16}>
              <Col>
                <QuestionCircleOutlined style={{ marginRight: 4 }} />
                <span>
                  {test?.totalQuestions} {t('question', { ns: 'test' })}
                </span>
              </Col>
              <Col>
                <TrophyOutlined style={{ marginRight: 4 }} />
                <span>
                  {test?.Sections[0]?.totalScore} {t('point', { ns: 'test' })}
                </span>
              </Col>
              <Col>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                <span>
                  {test.duration === 0
                    ? `${t('no_time_limit', { ns: 'test' })}`
                    : `${test.duration}`}
                </span>
              </Col>
              <Col>
                <FileTextOutlined style={{ marginRight: 4 }} />
                <span>
                  {test.is_all_question_shown
                    ? `${t('show_all_questions_per_page', { ns: 'test' })}`
                    : `${t('show_only_one_question_per_page', { ns: 'test' })}`}
                </span>
              </Col>
              <Col>
                <ForkOutlined style={{ marginRight: 4 }} />
                <span>
                  {test.is_question_shuffled
                    ? `${t('shuffle_question', { ns: 'test' })}`
                    : `${t('keep_question_order', { ns: 'test' })}`}
                </span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Link to='/tests/12/result' className='link'>
              <FileDoneOutlined />
              <Typography.Text>
                {' '}
                {t('view_result', { ns: 'test' })}
              </Typography.Text>
            </Link>
            <Dropdown.Button
              overlay={
                <AddMenu
                  addRandomQues={() => setRandomQues(true)}
                  closeDropDown={() => setAddQuesDropDown(false)}
                />
              }
              icon={<DownOutlined />}
              className='btn-primary'
              type='primary'
              size='large'
            >
              <PlusCircleOutlined />
              <Typography.Text style={{ color: '#fff' }}>
                {t('add_question', { ns: 'test' })}
              </Typography.Text>
            </Dropdown.Button>
          </Col>
        </Row>
      </Col>
      {test.Sections[0].questions?.length > 0 && (
        <Col span={24}>
          <Row align='middle' justify='start' gutter={24}>
            <Col style={{ marginLeft: 18 }}>
              <Checkbox onChange={onCheck} checked={checkAll}>
                <Typography.Title level={5}>
                  {t('check_all', { ns: 'test' })}
                </Typography.Title>
              </Checkbox>
            </Col>
            {checkAll ? (
              <Col>
                <Select
                  style={{ width: 120 }}
                  onChange={onSelect}
                  value={checkOption}
                >
                  <Select.Option value='none'>
                    {t('select', { ns: 'test' })}
                  </Select.Option>
                  <Select.Option value='remove'>
                    {t('remove', { ns: 'test' })}
                  </Select.Option>
                </Select>
              </Col>
            ) : null}
          </Row>
        </Col>
      )}
      <Col span={24}>
        {dragList ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='questions'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className='draggable-wrapper'>
                    {dragList.map((question, index) => (
                      <Draggable
                        key={question._id}
                        draggableId={question._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <DragItem
                              question={question}
                              index={index}
                              checkAll={checkAll}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}

        {randomQues ? (
          <AddRandomQuestion rmvRandomQues={() => setRandomQues(false)} />
        ) : null}
      </Col>
    </>
  );
}

export default TestDrag;
