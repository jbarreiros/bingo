import React from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { selectAppName } from "app/appSlice";
import { Footer } from "components/footer/Footer";
import styles from "./NoGame.module.css";
import utilityStyles from "helpers.module.css";

export function NoGame() {
    const appName = useSelector(selectAppName);

    return (
        <div className={classnames(utilityStyles.oneColumnPageWrapper, utilityStyles.alignItemsCenter)}>
            <div className={styles.noGame}>
                <p>There is no <b>{appName}</b> game currently in progress.</p>
                <p><b>Check back soon!</b></p>
            </div>
            <Footer />
        </div>
    );
}