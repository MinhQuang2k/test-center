import React from 'react';
import { Col, Row, DatePicker, Space } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useSelector } from 'react-redux';
import {
  multiLanguageSelector,
  LANGUAGE_VI,
  LANGUAGE_EN,
} from '../../../../slices/multiLanguage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    // title: {
    //     display: true,
    //     text: 'Chart.js Line Chart',
    // },
  },
};

const labelsEN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];
const labelsVI = [
  'Tháng1',
  'Tháng2',
  'Tháng3',
  'Tháng4',
  'Tháng5',
  'Tháng6',
  'Tháng7',
];

export const dataVI = {
  labelsEN,
  datasets: [
    {
      label: 'Lượt thi',
      data: labelsEN.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const dataEN = {
  labelsVI,
  datasets: [
    {
      label: 'exams',
      data: labelsVI.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Chart(props) {
  const { language } = useSelector(multiLanguageSelector);
  return (
    <div className="white_bg pd_20">
      <Row gutter={[8, 8]}>
        <Col>
          <Space direction="vertical">
            <DatePicker.RangePicker size="small" />
          </Space>
        </Col>

        <Col span={24}>
          <Line
            options={options}
            data={language === LANGUAGE_VI ? dataVI : dataEN}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Chart;
