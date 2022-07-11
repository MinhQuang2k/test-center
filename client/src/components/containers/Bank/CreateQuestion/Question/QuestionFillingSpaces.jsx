import { Editor } from '@tinymce/tinymce-react';
import { Button, Col, Row, Modal, Form, Input, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import Required from '../../../../commons/Required';

function checkIfDuplicateExists(arr) {
  return new Set(arr).size !== arr.length
}

function QuestionFillingSpaces(props) {
  const { t } = useTranslation('bank');
  const editorRef = useRef(null);
  const [question, setQuestion] = useState();

  const [renderAnswer, setRenderAnswer] = useState(false);

  const [placeEmpty, setPlaceEmpty] = useState([])

  const log = () => {
    if (editorRef.current) {
      const value = editorRef.current.getContent();
      const pattern = /\[%[0-9]+%\]/;
      const found = value.match(/\[%[0-9]+%\]/g);

      if (pattern.test(value) && !checkIfDuplicateExists(found)) {
        setRenderAnswer(true);
        setQuestion(value);

        document.querySelector(
          '.question_filling_blank_spaces',
        ).innerHTML = `<Col span={23}>${value}</Col>`;
        setPlaceEmpty(value.match(/\[%[0-9]+%\]/g));

      } else {
        Modal.info({
          title: t('Notification', { ns: 'bank' }),
          icon: <ExclamationCircleOutlined />,
          content: t('Please_enter_a_question', { ns: 'bank' }),
          okText: t('yes', { ns: 'testCampaign' }),
          onOk() {
            //console.log('delete')
          },
          maskClosable: true,
        });
      }

    }
  };


  const editQuestion = () => {
    setRenderAnswer(false);
    document.querySelector('.question_filling_blank_spaces').innerHTML = ``;
  };

  return (
    <>
      <Col span={24}>
        <div className='white_bg pd_20 '>
          <Row gutter={[8, 8]}>
            <Col flex={1}>
              <h6>
                {t('Enter_the_question', { ns: 'bank' })} <Required />
              </h6>
            </Col>
            {renderAnswer && (
              <Col>
                <Tooltip title={t('Edit', { ns: 'bank' })}>
                  <EditOutlined onClick={editQuestion} />
                </Tooltip>
              </Col>
            )}
            <Col span={24} className='question'>
              <Row wrap={false} gutter={[8, 8]} justify='space-between'>
                <div className='question_filling_blank_spaces'></div>
                {!renderAnswer && (
                  <Col span={24}>
                    <Editor
                      apiKey='b3m4owtz9mxa6zl1otn948snen4m5np54rm3w5s6a5zny4kz'
                      cloudChannel='5-stable'
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={question}
                      init={{
                        statusbar: false,
                        menubar: false,
                        inline: true,
                        placeholder: t('enter_content', { ns: 'bank' }),
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste help autoresize',
                        ],
                        toolbar_mode: 'sliding',
                        toolbar:
                          ' bold italic underline | forecolor backcolor casechange ' +
                          ' permanentpen formatpainter | numlist bullist checklist | ' +
                          ' insertfile image media pageembed template link |alignleft aligncenter alignright alignjustify |  ',
                        content_style:
                          'body {font - family:Arial,sans-serif; font-size:14px }',
                      }}
                    />
                    <br />
                    <Button type='primary' onClick={log}>
                      {t('Save_question', { ns: 'bank' })}
                    </Button>
                  </Col>
                )}

              </Row>
            </Col>
          </Row>
        </div>
      </Col>
      {renderAnswer && (
        <Col span={24}>
          <div className='white_bg pd_20 '>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h6>{t('Enter_essay_question_info', { ns: 'bank' })}</h6>
              </Col>
              <Col span={24}>
                <p className='text_mute'>
                  - {t('The_system_does_not_distinguish', { ns: 'bank' })}
                </p>
                <p className='text_mute'>
                  - {t('To_record_more_than_one_correct_answer', { ns: 'bank' })}
                </p>
              </Col>
              <Col span={24}>
                <Form
                  name='basic'
                  initialValues={{}}
                  autoComplete='off'
                >
                  {placeEmpty.map((element, index) => (
                    <Form.Item label={element.slice(2, -2)} name={element[2]}>
                      <Input />
                    </Form.Item>
                  ))}
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
      )}
    </>
  );
}

export default QuestionFillingSpaces;
