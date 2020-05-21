import React from 'react';
import styles from './Tabs.module.css';

export function Tabs(props) {
  return (
    <nav>
      <ul className={styles.tabs}>
        {props.children}
      </ul>
    </nav>
  );
}
