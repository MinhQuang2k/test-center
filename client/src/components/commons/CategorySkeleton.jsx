import { Skeleton, Space, Collapse } from 'antd';
import React from 'react';
const { Panel } = Collapse;

function CategorySkeleton(props) {
  return (
    <Collapse collapsible='disabled' ghost>
      <Panel
        showArrow={false}
        ghost
        extra={[
          <Space size='large' key={1}>
            <Skeleton.Avatar active size='small' shape='square' key={2000} />
            <Skeleton.Avatar active size='small' shape='square' key={2001} />
            <Skeleton.Avatar active size='small' shape='square' key={2002} />
          </Space>,
        ]}
        header={
          <>
            <div className='pannel-header'>
              <h4 className='header'>
                {' '}
                <Skeleton.Input active size={20} />
              </h4>
              <div className='child'>
                <Skeleton.Input active size={14} />
              </div>
            </div>
          </>
        }
      ></Panel>
    </Collapse>
  );
}

export default CategorySkeleton;
