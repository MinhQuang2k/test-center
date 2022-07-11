import { Row, Col, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  QuestionCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  ForkOutlined,
  FileDoneOutlined,
  PlusCircleOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import AddSection from '../Forms/AddSection';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import { useSelector, useDispatch } from 'react-redux';
import { sectionSelector, reset } from '../../../../../slices/section';
function TestSection({ data }) {
  const { t } = useTranslation('test', 'common');
  const [sections, setSections] = useState(data.Sections);
  const [sectionModal, setSectionModal] = useState(false);
  const { section, message } = useSelector(sectionSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (section) {
      if (message === 'created') {
        setSections([section, ...sections]);
        dispatch(reset());
      } else if (message === 'deleted') {
        setSections((prevState) => {
          return prevState.filter((item) => item.id !== section);
        });
        dispatch(reset());
      } else {
        setSections((prevState) => {
          const updated = prevState.map((item) => {
            if (section.id === item.id) {
              return { ...item, ...section };
            } else {
              return item;
            }
          });
          return updated;
        });
        dispatch(reset());
      }
    }
  }, [section]);
  const handleClick = () => {
    setSectionModal(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceId = sections.filter(
        (section) => section.id === Number(source.droppableId),
      );
      const destId = sections.filter(
        (section) => section.id === Number(destination.droppableId),
      );
      const questionsSource = Array.from(sourceId[0].questions);
      const questionsDest = Array.from(destId[0].questions);
      const remove = questionsSource.splice(source.index, 1)[0];
      questionsDest.splice(destination.index, 0, remove);
      const newSections = sections.map((item) => {
        if (item.id === Number(source.droppableId)) {
          return { ...item, questions: questionsSource };
        }
        if (item.id === Number(destination.droppableId)) {
          return { ...item, questions: questionsDest };
        }
        return item;
      });
      setSections(newSections);
    } else {
      const sourceId = sections.filter(
        (section) => section.id === Number(source.droppableId),
      );
      const questions = Array.from(sourceId[0].questions);
      const remove = questions.splice(source.index, 1)[0];
      questions.splice(destination.index, 0, remove);
      const newSections = sections.map((item) => {
        if (item.id === Number(source.droppableId)) {
          return { ...item, questions: questions };
        }
        return item;
      });
      setSections(newSections);
    }
  };
  return (
    <>
      <Col span={24}>
        <Row gutter={[0, 24]} align='middle' justify='space-between'>
          <Col span={20}>
            <Row gutter={8}>
              <Col>
                <OrderedListOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.Sections?.length} {t('section', { ns: 'test' })}
                </span>
              </Col>
              <Col>
                <OrderedListOutlined style={{ marginRight: 4 }} />
                <span>{t('move_section', { ns: 'test' })}</span>
              </Col>
              <Col>
                <QuestionCircleOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.totalQuestions} {t('Question', { ns: 'test' })}
                </span>
              </Col>
              <Col>
                <TrophyOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.totalScore} {t('score', { ns: 'test' })}
                </span>
              </Col>
              <Col>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.duration === 0
                    ? `${t('time_unlimited', { ns: 'test' })}`
                    : `${data.duration} ${
                        data.duration === 1
                          ? t('minute', { ns: 'test' })
                          : t('minutes', { ns: 'test' })
                      }`}
                </span>
              </Col>
              <Col>
                <FileTextOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.is_all_question_shown
                    ? `${t('show_all_questions_per_page', { ns: 'test' })}`
                    : `${t('show_only_one_question_per_page', { ns: 'test' })}`}
                </span>
              </Col>
              <Col>
                <ForkOutlined style={{ marginRight: 4 }} />
                <span>
                  {data.is_question_shuffled
                    ? `${t('keep_question_order', { ns: 'test' })}`
                    : `${t('mix_question_order', { ns: 'test' })}`}
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={4} className='btn-group'>
            <Link to='/tests/12/result' className='link'>
              <FileDoneOutlined />
            </Link>
            <Button
              type='primary'
              className='btn-primary'
              icon={<PlusCircleOutlined />}
              size='large'
              onClick={handleClick}
            >
              {t('add_section', { ns: 'test' })}
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <DragDropContext onDragEnd={onDragEnd}>
          {sections?.map((section) => (
            <Droppable droppableId={`${section.id}`} key={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    padding: 4,
                    width: '100%',
                  }}
                >
                  <Section provided={provided} section={section}></Section>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Col>

      <Modal
        title={t('add_section_modal_title', { ns: 'test' })}
        visible={sectionModal}
        onCancel={() => setSectionModal(false)}
        style={{ top: 25 }}
        footer={null}
      >
        <AddSection closeModal={() => setSectionModal(false)} />
      </Modal>
    </>
  );
}

export default TestSection;
