import { Skeleton, Row, Col } from 'antd';
function QuestionGroupSkeleton() {
  return (
    <div className='question'>
      <div className='question-item question-item-title'>
        <Skeleton title={<></>} active paragraph={{ rows: 0 }} />
        <div className='question-item-option c-button-center'>
          <Skeleton.Button block active className='c-button-quetionGroup' />
          <Skeleton.Button block active className='c-button-quetionGroup' />
        </div>
      </div>
    </div>
  );
}

export default QuestionGroupSkeleton;
