import React from "react";
import { useSelector } from "react-redux";
import { selectAppName } from "app/appSlice";
import classnames from "classnames";
import { Helmet } from "react-helmet";
import { Footer } from "components/footer/Footer";
import styles from "helpers.module.css";

function spaceship(a, b) {
  if (typeof a === 'string') {
    return a.localeCompare(b);
  } else {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  }
}

export function ListTiles(props) {
  const tiles = props.tiles.sort(spaceship);
  const appName = useSelector(selectAppName);

  return (
    <>
      <Helmet>
        <title>Tiles - {appName}</title>
      </Helmet>
      <div className={styles.oneColumnPageWrapper}>
        <p className={styles.textCenter}>Available Tiles:</p>
        <ul className={classnames(styles.unstyledList, styles.textCenter)}>
          {tiles.map(tile => (<li key={tile.toString()}>{tile}</li>))}
        </ul>
        <Footer />
      </div>
    </>
  );
}
