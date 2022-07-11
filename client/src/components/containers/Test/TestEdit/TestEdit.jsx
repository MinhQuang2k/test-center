import { Breadcrumb, Row, Col, Typography, Divider } from 'antd';
import TestTopRight from './TestTopRight';
import { Link, useParams } from 'react-router-dom';
import TestDrag from './Drag/TestDrag';
import TestSection from './HasSection/TestSection';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { testSelector, getTest, resetTest } from '../../../../slices/test';
function TestEdit() {
  const { test } = useSelector(testSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(getTest(id));
    })();
    return () => dispatch(resetTest());
    //eslint-disable-next-line
  }, []);
  return (
    <div className='container test-edit tab-style'>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/tests'>Đề Thi</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{test?.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24}>
          <Row align='middle' justify='space-between'>
            <Col>
              <Typography.Title level={3}>{test?.name}</Typography.Title>
            </Col>
            <Col>
              <TestTopRight />
            </Col>
          </Row>
        </Col>
        <Divider style={{ marginTop: 0, marginBottom: 12 }} />
        {test ? (
          test.has_multi_section ? (
            <TestSection data={test} />
          ) : (
            <TestDrag data={test} />
          )
        ) : null}
      </Row>
    </div>
  );
}

export default TestEdit;
