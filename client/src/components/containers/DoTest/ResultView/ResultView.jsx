import { Button, Col, Row, Progress, Divider } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import successful from '../../../../assets/img/successful.png';
import QuestionType1and2 from './ResultQuestion/Type/QuestionType1and2';
import QuestionType3 from './ResultQuestion/Type/QuestionType3';
import QuestionType4 from './ResultQuestion/Type/QuestionType4';
import QuestionType5 from './ResultQuestion/Type/QuestionType5';
import QuestionType6 from './ResultQuestion/Type/QuestionType6';
import QuestionType7 from './ResultQuestion/Type/QuestionType7';
import { useState } from 'react';

const showQuestion = (question, answers) => {
  if (question.type === 1 || question.type === 2)
    return <QuestionType1and2 data={question} answers={answers} />;
  if (question.type === 3)
    return <QuestionType3 data={question} answers={answers} />;
  if (question.type === 6)
    return <QuestionType4 data={question} answers={answers} />;
  if (question.type === 7)
    return <QuestionType5 data={question} answers={answers} />;
  if (question.type === 8)
    return <QuestionType6 data={question} answers={answers} />;
  if (question.type === 9)
    return <QuestionType7 data={question} answers={answers} />;
};

const ResultView = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  return (
    <Row justify='center' className='result-view'>
      <Col span={24} className='content-center mt-5'>
        <img src={successful} />
        <h1 className='text-success mt-1 size-3'>HOÀN THÀNH BÀI KIỂM TRA</h1>
        <p className='mb-1'>Cảm ơn csdca đã tham gia bài kiểm tra.</p>
        <p className='mb-1'>
          Bài thi này có thể làm lại nhiều lần, bạn có muốn thử lại ?
        </p>
        <div className='mb-2'>
          <Button
            type='primary'
            ghost
            icon={<RetweetOutlined />}
            className='btn-outline'
          >
            Làm lại bài thi
          </Button>
        </div>
      </Col>
      <Col span={9}>
        <div className='box-result-test'>
          <h3 className='title-result'>KẾT QUẢ BÀI KIỂM TRA</h3>
          <div className='box-alert'>
            <p>• Có 1 câu tự luận đang chờ chấm điểm</p>
            <p>• Kết quả dưới đây chưa tính kết quả của các câu tự luận</p>
          </div>
          <div className='box-score'>
            <p className='content-center text-success mt-3 mb-2'>
              <span className='size-score'>1.5</span>
              <span className='text-bold size-total-score'> /7 ĐIỂM</span>
            </p>
          </div>
          <div className='box-content-result'>
            <div className='box-content'>
              <div className='box-left'>Phần trăm hoàn thành đúng</div>
              <div className='box-right precent-box'>
                <Progress percent={30} size='small' />
              </div>
            </div>
            <div className='box-content'>
              <div className='box-left'>
                Số câu đúng (chưa tính câu tự luận)
              </div>
              <div className='box-right'>
                <b>1/6</b>
              </div>
            </div>
            <div className='box-content'>
              <div className='box-left'>Số câu tự luận</div>
              <div className='box-right'>
                <b>1</b>
              </div>
            </div>
            <div className='box-content'>
              <div className='box-left'>Thời gian làm bài</div>
              <div className='box-right'>
                <b>00:00:40</b>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col span={24} className='mb-2'>
        <div className='content-center my-1'>
          <Button
            type='primary'
            onClick={() => setIsShowAnswer(!isShowAnswer)}
            id='test1'
            name='test1'
          >
            {isShowAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
          </Button>
        </div>
      </Col>

      {isShowAnswer && (
        <Col span={24} className='detail-result'>
          <div className='content-center title-detail-result'>
            Kết quả bài kiểm tra
          </div>
          <Divider />
          <div>
            {data.questions.map((question) => (
              <div key={question.id}>
                {showQuestion(question, data.answers[question.index])}
                <Divider />
              </div>
            ))}
          </div>
        </Col>
      )}
    </Row>
  );
};

const data = {
  questions: [
    {
      note_answer: null,
      index: 2,
      id: 240345,
      content: '<p>asa</p>',
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: 'b', content: '<p>2</p>' },
        { id: 'd', content: '<p>4</p>' },
        { id: 'c', content: '<p>3</p>' },
        { id: 'a', content: '<p>1</p>' },
        { id: 'e', content: '<p>5</p>' },
      ],
      has_mul_correct_answers: true,
      scoring_type: 0,
      correct_answers: ['b', 'c'],
    },
    {
      note_answer: '<p>d</p>',
      index: 4,
      id: 240298,
      content: '<p>nhiueu dap ans 2</p>',
      type: 1,
      time_limit: 3600,
      score: 1,
      answers: [
        { id: 'a', content: '<p>1</p>' },
        { id: 'b', content: '<p>2</p>' },
      ],
      has_mul_correct_answers: true,
      scoring_type: 1,
      correct_answers: ['a', 'b'],
      start_at: '2022-07-05 10:15:39',
    },
    {
      note_answer: '<p>dsadsa</p>',
      index: 6,
      id: 240286,
      content: '<p>1</p>',
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: 'a', content: '<p>1</p>' },
        { id: 'c', content: '<p>3</p>' },
        { id: 'd', content: '<p>4</p>' },
        { id: 'b', content: '<p>2</p>' },
      ],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: ['a'],
    },
    {
      note_answer: null,
      index: 5,
      id: 240291,
      content: '<p>xsa</p>',
      type: 3,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: null,
      note: 'xsacs',
      is_file_required: 0,
    },
    {
      id: 240292,
      index: 3,
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
      programming_langs_allow: [
        'php',
        'nodejs',
        'java',
        'python',
        'ruby',
        'cs',
      ],
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
      note_answer: '<p>cass</p>',
      index: 1,
      id: 240358,
      content:
        '<figure class="table"><table><tbody><tr><td>xs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>xs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>cs</td><td>cs</td><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>cs</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>',
      type: 1,
      time_limit: null,
      score: 1,
      answers: [
        { id: 'a', content: '<p>s</p>' },
        { id: 'b', content: '<p>c</p>' },
        { id: 'd', content: '<p>c</p>' },
        { id: 'c', content: '<p>s</p>' },
      ],
      has_mul_correct_answers: false,
      scoring_type: 0,
      correct_answers: ['b'],
    },
    {
      note_answer: '<p>dwed</p>',
      index: 3,
      id: 240300,
      content: '<p>xsa</p>',
      type: 8,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 1,
      correct_answers: null,
      matching_answers: {
        questions: [
          { id: 1, content: '<p>1</p>' },
          { id: 2, content: '<p>2</p>' },
          { id: 3, content: '<p>3</p>' },
        ],
        answers: [
          { id: 'a', content: '<p>2</p>' },
          { id: 'b', content: '<p>4</p>' },
        ],
      },
      matching_correct_answers: { 1: ['a'], 2: ['a', 'b'], 3: ['b'] },
      matching_answer_type: 1,
    },
    {
      note_answer: '<p>hiae</p>',
      index: 7,
      id: 240278,
      content:
        '<p><span style="background-color:rgb(44,75,159);color:rgb(255,255,255);">Filling blank spaces</span><span style="background-color:hsl(204,8%,98%);color:hsl(0,0%,0%);"> &nbsp;test</span></p><div class="mt-2" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.5rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>C\u00f4ng cha nh\u01b0 n\u00fai th\u00e1i [%1%]</p></div><div class="mt-1" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(33, 37, 41);font-family:mainfont, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-top:0.25rem !important;orphans:2;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><p>[%2%] nh\u01b0 n\u01b0\u1edbc trong ngu\u1ed3n ch\u1ea3y ra</p></div>',
      type: 9,
      time_limit: null,
      score: 1,
      answers: [],
      has_mul_correct_answers: false,
      scoring_type: 1,
      correct_answers: null,
      fill_blank_correct_answers: [
        { key: 1, content: ['s\u01a1n'] },
        { key: 2, content: ['ngu\u1ed3n'] },
      ],
    },
  ],
  answers: {
    1: ['b'],
    2: ['c', 'd', 'b'],
    3: { 1: ['a'], 2: ['b', 'a'], 3: [] },
    4: ['b'],
    5: {
      answer: 'vfdgcbsd   c\u00fadgcuds',
      file: null,
      score: null,
      comment: null,
    },
    6: ['b'],
    7: ['s\u01a1n', 'Ngh\u0129a m\u1eb9'],
    8: ['b'],
    9: ['s\u01a1n', 'Ngh\u0129a m\u1eb9'],
  },
  start_at: '2022-07-05T03:15:22.000000Z',
  end_at: '2022-07-05T03:16:15.000000Z',
  score: 1.5,
  max_score: 7,
  complete_percent: 21.43,
  created_at: '2022-07-05T03:15:19.000000Z',
  updated_at: '2022-07-05T03:16:15.000000Z',
  test_id: 30317,
  examiner_id: 11764,
  need_grade: 1,
  type: 1,
  result: null,
  is_passed: null,
  is_send_result: 0,
  result_send_at: null,
  identify_code: null,
  group: null,
  toeic_reading_score: null,
  toeic_listening_score: null,
  position: null,
  is_graded_it: 0,
  is_exist_it_questions: 0,
  action_logs:
    '{"questions":[{"index":1,"time":"2022-07-05 10:15:24:742","type":"start-question"},{"index":2,"time":"2022-07-05 10:15:27:997","type":"start-question"},{"index":3,"time":"2022-07-05 10:15:32:661","type":"start-question"},{"index":4,"time":"2022-07-05 10:15:41:069","type":"start-question"},{"index":5,"time":"2022-07-05 10:15:46:017","type":"start-question"},{"index":6,"time":"2022-07-05 10:15:52:245","type":"start-question"},{"index":7,"time":"2022-07-05 10:16:03:169","type":"start-question"}],"userActions":[{"type":"start-test","time":"2022-07-05 10:15:22:601"},{"type":"finish-test","time":"2022-07-05 10:16:15:262"}]}',
  ip: '222.252.30.146',
};

export default ResultView;
