import { CheckCircleOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';

function QuestionDetail({ question }) {
  return (
    <div className='question--detail'>
      <Divider />
      <div className='detail'>
        <div className='question--answer'>
          <h3>Đáp án</h3>
          <p>
            <CheckCircleOutlined />
            {'A)'}
            {'1'}
          </p>
          <p>
            <CheckCircleOutlined />
            {'B)'}
            {'2'}
          </p>
          <p>
            <CheckCircleOutlined />
            {'C)'}
            {'3'}
          </p>
          <p>
            <CheckCircleOutlined />
            {'D)'}
            {'4'}
          </p>
        </div>
        <div className='question--info'>
          <h3>Thông tin câu hỏi</h3>
          <div>
            <div className='info'>Kiểu câu hỏi</div>
            <div className='info'>Đúng/Sai</div>
          </div>
          <div>
            <div className='info'>Điểm</div>
            <div className='info'>1</div>
          </div>

          <div>
            <div className='info'>Ngày tạo</div>
            <div className='info'>21/05/2022 14:34:05</div>
          </div>
          <div>
            <div className='info'>Thời gian làm bài</div>
            <div className='info'>Không giới hạn</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
