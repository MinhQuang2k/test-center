import { Empty, Typography } from 'antd';
import React from 'react';
const { Text } = Typography;

function EmptyResult({ image, message }) {
  return (
    <div>
      <br />
      <br />
      <Empty image={image} imageStyle={{ height: 120 }} description={<br />}>
        <Text
          style={{ color: 'rgb(108, 117, 125)', fontSize: 20, fontWeight: 450 }}
        >
          {message}
        </Text>
      </Empty>
    </div>
  );
}

export default EmptyResult;
