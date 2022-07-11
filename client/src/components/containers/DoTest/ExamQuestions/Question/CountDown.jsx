import { Col, Progress, Statistic } from 'antd';
import { useEffect, useState } from 'react';
function CountDown({ timeDate, renderTime, onFinish, time }) {
  const [timeProgress, setTimeProgress] = useState(100);
  const handleCountDownProgress = (value) => {
    setTimeProgress(value / time / 10);
  };

  return (
    <>
      {renderTime ? (
        <>
          <Statistic.Countdown
            value={timeDate}
            onFinish={onFinish}
            onChange={handleCountDownProgress}
          />
          <Progress percent={timeProgress} showInfo={false} />
        </>
      ) : (
        <p>
          Hết thời gian trả lời, bạn không thể thay đổi câu trả lời của câu hỏi
          này
        </p>
      )}
    </>
  );
}

export default CountDown;
