import React from "react";
import classnames from "classnames";
import styles from "./Footer.module.css";

export function Footer(props) {
  return (
    <footer className={classnames(props.className, styles.footer)}>
      <p>&#10803;</p>
      <p>
        {props.appName} is fictional and does not depict anything real or imagined.
      </p>
    </footer>
  );
}
