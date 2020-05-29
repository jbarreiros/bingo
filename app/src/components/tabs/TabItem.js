import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage, selectActivePage } from "../../app/appSlice";
import styles from "./Tabs.module.css";

export function TabItem(props) {
  const dispatch = useDispatch();
  const activePage = useSelector(selectActivePage);

  return (
    <li
      className={[
        styles.tab,
        activePage === props.name ? styles.tabSelected : "",
      ].join(" ")}
    >
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(changePage(props.name))}
      >
        {props.label}
        {props.children}
      </button>
    </li>
  );
}
