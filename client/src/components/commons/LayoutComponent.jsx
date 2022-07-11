import React from 'react';
import { Outlet } from 'react-router-dom';

function LayoutComponent(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default LayoutComponent;
