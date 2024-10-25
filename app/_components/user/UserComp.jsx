
"use client"

import React, { useState } from 'react';
import styles from "./userComp.module.css";
import Icon from '@leafygreen-ui/icon';
import { Modal, Container } from 'react-bootstrap';
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Link, Description } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
const UserComp = ({user}) => {

    return (
        <Card className={`${styles.userCard}`}>
            <img src='rsc/users/66fe219d625d93a100528224.png'></img>
            <Body className={styles.userName}>John</Body>
        </Card>
    );
};


export default UserComp;
