import { Skeleton, Row, Col } from 'antd'
function CustomSkeleton() {
  return (
    <div
      style={{
        margin: '20px 0',
        backgroundColor: '#fff',
        padding: '12px 12px 0 12px',
        borderRadius: 4,
      }}
    >
      <Skeleton.Button
        block
        active
        size="small"
        shape="round"
        style={{ marginBottom: 12 }}
      />
      <Row justify="start" gutter={[0, 0]}>
        <Col span={6}>
          <Skeleton title={<></>} active paragraph={{ rows: 0 }} width="200" />
        </Col>
        <Col span={6}>
          <Skeleton title={<></>} active paragraph={{ rows: 0 }} width="200" />
        </Col>
        <Col span={6}>
          <Skeleton title={<></>} active paragraph={{ rows: 0 }} width="200" />
        </Col>
        <Col span={6}>
          <Skeleton title={<></>} active paragraph={{ rows: 0 }} width="200" />
        </Col>
      </Row>
    </div>
  )
}

export default CustomSkeleton
