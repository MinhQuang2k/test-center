import { Row, Col, Skeleton, Button, Divider, Statistic, Anchor } from 'antd';
import React from 'react';
import {
  BackwardOutlined,
  ForwardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Questions from './Question/Questions';

function ExamQuestions(props) {
  const onFinish = () => {
    console.log('finished!');
  };

  return (
    <div className='exam_question'>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Row gutter={[16, 16]} justify='center'>
            <Questions data={data} />
            <Col span={24}>
              <Row>
                <Col flex={1}>
                  <Button>
                    <BackwardOutlined /> Câu hỏi trước
                  </Button>
                </Col>
                <Col>
                  <Button>
                    Câu hỏi tiếp theo <ForwardOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type='primary'>Nộp bài thi</Button>
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <Anchor offsetTop={80}>
            <div className='pd_20 exam list_question'>
              <Row justify='center' gutter={[16, 16]}>
                <Col>
                  <Row justify='center' gutter={[24, 24]}>
                    <span>Thời gian làm bài kiểm tra còn lại</span>

                    <Statistic.Countdown
                      value={Date.now() + 60 * 1000}
                      onFinish={onFinish}
                    />

                    <small>
                      Khi hết thời gian làm bài, kết quả sẽ chỉ được tính ở các
                      câu bạn đã chọn đáp án.
                    </small>

                    <Col>
                      <span>Danh sách câu hỏi</span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={[16, 16]}>
                    {data &&
                      data.map((question) => (
                        <Col span={24} key={question.id}>
                          {question.type == 10 ? (
                            <>
                              <Row>
                                <Col span={22}>
                                  <p className='question--list_question text_mute'>
                                    Cau {question.index}:
                                  </p>
                                </Col>
                              </Row>
                              {question?.children_questions.map(
                                (childrenQuestions) => (
                                  <Row
                                    className='children-questions'
                                    key={childrenQuestions.id}
                                  >
                                    <Col span={22}>
                                      <p className='question--list_question text_mute'>
                                        Cau {question.index}.
                                        {childrenQuestions.index}:
                                      </p>
                                    </Col>
                                    <Col span={2}>
                                      <CheckCircleOutlined />
                                    </Col>
                                  </Row>
                                ),
                              )}
                            </>
                          ) : (
                            <Row>
                              <Col span={22}>
                                <p className='question--list_question text_mute'>
                                  Cau {question.index}:
                                </p>
                              </Col>
                              <Col span={2}>
                                <CheckCircleOutlined />
                              </Col>
                            </Row>
                          )}
                        </Col>
                      ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Anchor>
        </Col>
      </Row>
    </div>
  );
}

const data = [
  {
    id: 240286,
    index: 1,
    content: '<p>1</p>',
    type: 1,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: false,
    answers: [
      { id: 'd', content: '<p>4</p>' },
      { id: 'b', content: '<p>2</p>' },
      { id: 'c', content: '<p>3</p>' },
      { id: 'a', content: '<p>1</p>' },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240344,
    index: 3,
    content:
      'This question has a time limit to answer is 01:00:00, click start to view and answer the question',
    type: 1,
    old_time_limit: 3600,
    time_limit: 3600,
    start_at: null,
    has_mul_correct_answers: true,
    answers: [
      { id: 'b', content: '<p>2</p>' },
      { id: 'a', content: '<p>1</p>' },
      { id: 'd', content: '<p>4</p>' },
      { id: 'e', content: '<p>5</p>' },
      { id: 'c', content: '<p>3</p>' },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240282,
    index: 2,
    content: '<p>sql test</p>',
    type: 7,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    answer: [],
    sql_input:
      "-- Create table and insert rows using SQL. Sample below\n\nCREATE TABLE employees\n  (\n     id   INT,\n     name VARCHAR(255)\n  );\n\nINSERT INTO employees (id, name) VALUES (1, 'Matt');\nINSERT INTO employees (id, name) VALUES (2, 'John');",
    schema_structure:
      '[{"table_name":"employees","total_records":"2","columns":"id, name"}]',
    section_id: null,
  },
  {
    id: 240278,
    index: 3,
    content:
      '<p><span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Filling blank spaces</span><span style="background-color:hsl(204,8%,98%);color:hsl(0,0%,0%);"> &nbsp;test</span></p><div class="mt-2" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.5rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>C\u00f4ng cha nh\u01b0 n\u00fai th\u00e1i [%1%]</p></div><div class="mt-1" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.25rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>[%2%] nh\u01b0 n\u01b0\u1edbc trong ngu\u1ed3n ch\u1ea3y ra</p></div>',
    type: 9,
    old_time_limit: 0,
    time_limit: 10,
    start_at: null,
    fill_blank_correct_answers: [{ key: 1 }, { key: 2 }],
    scoring_type: 1,
    section_id: null,
  },
  {
    id: 240289,
    index: 5,
    content: '<p>dd</p>',
    type: 2,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: false,
    answers: [
      { id: 'a', content: '\u0110\u00fang' },
      { id: 'b', content: 'Sai' },
    ],
    examinee_answers: [],
    section_id: null,
  },
  {
    id: 240290,
    index: 6,
    content:
      '<p>test <span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Matching</span></p>',
    type: 8,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    answer: [],
    matching_answers: {
      questions: [
        { id: 1, content: '<p>1</p>' },
        { id: 2, content: '<p>2</p>' },
        { id: 3, content: '<p>3</p>' },
      ],
      answers: [
        { id: 'a', content: '<p>2</p>' },
        { id: 'b', content: '<p>1</p>' },
        { id: 'c', content: '<p>3</p>' },
      ],
    },
    matching_answer_type: 1,
    scoring_type: 1,
    section_id: null,
  },
  {
    id: 240291,
    index: 7,
    content: '<p>xsa</p>',
    type: 3,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    examinee_answers: [],
    is_file_required: false,
    section_id: null,
  },
  {
    id: 240292,
    index: 8,
    content: '<p>casc xcsacsa</p>',
    type: 6,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    submitted_data: [],
    examinee_answers: [],
    code_stubs: [
      {
        id: 12493,
        code: '<?php\n\nfunction functionExample () {\n    // code here\n}\n\n?>',
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'php',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
      {
        id: 12494,
        code: '#!/bin/python3\n\nimport math\nimport os\nimport random\nimport re\nimport sys\n\ndef functionExample ():\n    #code here\n    pass',
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'python',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
      {
        id: 12495,
        code: "'use strict';\n\nfunction functionExample () {\n    // code here\n}",
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'nodejs',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
      {
        id: 12496,
        code: 'import java.io.*;\nimport java.math.*;\nimport java.security.*;\nimport java.text.*;\nimport java.util.*;\nimport java.util.concurrent.*;\nimport java.util.regex.*;\n\npublic class Main {\n\tpublic static void main(String[] args) throws IOException {\n\t\t\n\t}\n}',
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'java',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
      {
        id: 12497,
        code: "#!/bin/ruby\n\nrequire 'json'\nrequire 'stringio'\ndef functionExample ()\n    # code here\nend",
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'ruby',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
      {
        id: 12498,
        code: 'using System.CodeDom.Compiler;\nusing System.Collections.Generic;\nusing System.Collections;\nusing System.ComponentModel;\nusing System.Diagnostics.CodeAnalysis;\nusing System.Globalization;\nusing System.IO;\nusing System.Linq;\nusing System.Reflection;\nusing System.Runtime.Serialization;\nusing System.Text.RegularExpressions;\nusing System.Text;\nusing System;\n\nclass Solution {\n\tpublic static void Main(String[] args) \n\t{\n\t\t\n\t}\n}',
        question_id: 240292,
        return_type: 'string',
        function_name: 'functionExample',
        programming_lang: 'cs',
        parameters: [{ type: 'string', name: 'parameter1' }],
        created_at: '2022-07-02T09:34:31.000000Z',
        updated_at: '2022-07-02T09:34:31.000000Z',
      },
    ],
    test_cases: [
      {
        id: 36526,
        created_at: '2022-07-02 16:34:31',
        updated_at: '2022-07-02 16:34:31',
        name: 'Testcase 1',
        input_file_name: 'eEhi2Nn50nkQ8CqZCUAw-input.txt',
        output_file_name: 'eEhi2Nn50nkQ8CqZCUAw-output.txt',
        input_url:
          'https://static.testcenter.vn/test_cases/eEhi2Nn50nkQ8CqZCUAw-input.txt',
        output_url:
          'https://static.testcenter.vn/test_cases/eEhi2Nn50nkQ8CqZCUAw-output.txt',
        hidden: false,
      },
      {
        id: 36527,
        created_at: '2022-07-02 16:34:31',
        updated_at: '2022-07-02 16:34:31',
        name: 'Testcase 2',
        input_file_name: 'W4vdQH9sQFiiRbGQAQZg-input.txt',
        output_file_name: 'W4vdQH9sQFiiRbGQAQZg-output.txt',
        input_url:
          'https://static.testcenter.vn/test_cases/W4vdQH9sQFiiRbGQAQZg-input.txt',
        output_url:
          'https://static.testcenter.vn/test_cases/W4vdQH9sQFiiRbGQAQZg-output.txt',
        hidden: false,
      },
      {
        id: 36528,
        created_at: '2022-07-02 16:34:31',
        updated_at: '2022-07-02 16:34:31',
        name: 'Testcase 3',
        input_file_name: 'BoUJwzphKfrSrWGUHKbh-input.txt',
        output_file_name: 'BoUJwzphKfrSrWGUHKbh-output.txt',
        input_url:
          'https://static.testcenter.vn/test_cases/BoUJwzphKfrSrWGUHKbh-input.txt',
        output_url:
          'https://static.testcenter.vn/test_cases/BoUJwzphKfrSrWGUHKbh-output.txt',
        hidden: false,
      },
    ],
    programming_langs_allow: ['php', 'nodejs', 'java', 'python', 'ruby', 'cs'],
    section_id: null,
  },
  {
    id: 240345,
    index: 9,
    content: '<p>asa</p>',
    type: 1,
    old_time_limit: 0,
    time_limit: 0,
    start_at: null,
    has_mul_correct_answers: true,
    answers: [
      { id: 'a', content: '<p>1</p>' },
      { id: 'c', content: '<p>3</p>' },
      { id: 'e', content: '<p>5</p>' },
      { id: 'b', content: '<p>2</p>' },
      { id: 'd', content: '<p>4</p>' },
    ],
    examinee_answers: [],
    section_id: null,
  },
];

export default ExamQuestions;
