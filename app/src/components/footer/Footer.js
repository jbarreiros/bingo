import React from "react";
import { useSelector } from "react-redux";
import { selectAppName } from "app/appSlice";
import classnames from "classnames";
import styles from "./Footer.module.css";

export function Footer(props) {
  const appName = useSelector(selectAppName);

  return (
    <footer className={classnames(props.className, styles.footer)}>
      <p>&#10803;</p>
      <p>
        {appName} is fictional and does not depict anything real or imagined.
      </p>
    </footer>
  );
}
