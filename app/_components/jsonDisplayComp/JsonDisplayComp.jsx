import React from 'react';
import styles from './jsonDisplayComp.module.css'

const JsonDisplay = ({ data }) => {
    console.log(data)
    return <pre 
        className={styles.jsonDisplay}
    >
        {JSON.stringify(data, null, 2)}
    </pre>
};

export default JsonDisplay;