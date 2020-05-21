import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePage } from '../../app/appSlice';

export function TabContainer(props) {
  const activePage = useSelector(selectActivePage);

  return (
    <div style={activePage === props.name ? {} : {display: 'none'}}>
      {props.children}
    </div>
  );
}
