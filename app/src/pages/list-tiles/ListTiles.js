import React from "react";
import { useSelector } from "react-redux";
import { selectAppName } from "app/appSlice";
import { useFetch } from "hooks/useFetch";
import classnames from "classnames";
import { Helmet } from "react-helmet";
import { Footer } from "components/footer/Footer";
import styles from "helpers.module.css";

export function ListTiles() {
  const appName = useSelector(selectAppName);
  const { json: tiles } = useFetch('/api/tiles', { method: 'GET' });

  return (
    <>
      <Helmet>
        <title>Tiles - {appName}</title>
      </Helmet>
      <div className={styles.oneColumnPageWrapper}>
        <p className={styles.textCenter}>Tiles:</p>
        <ul className={classnames(styles.unstyledList, styles.textCenter)}>
          {tiles?.map(tile => (<li key={tile.toString()}>{tile}</li>))}
        </ul>
        <Footer />
      </div>
    </>
  );
}
