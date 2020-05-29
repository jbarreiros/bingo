import React from "react";
import styles from "./Modal.module.css";

export function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  return (
    <React.Fragment>
      <section className={styles.modal}>
        <header className={styles.header}>
          <h1 className={styles.title}>{props.modalTitle}</h1>
        </header>
        <div className="content">{props.children}</div>
        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.submit}
            onClick={props.onSubmit}
          >
            {props.submitText}
          </button>
        </footer>
      </section>
      <div className={styles.overlay}></div>
    </React.Fragment>
  );
}
