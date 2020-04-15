import React, { useState } from 'react';
import styles from './BingoTile.module.css';

export function BingoTile(props) {
    return (
        <div className={styles.tile}>
            {props.label}
        </div>
    );
}