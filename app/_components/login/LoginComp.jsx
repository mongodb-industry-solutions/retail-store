
"use client"

import React, { useState } from 'react';
import styles from "./loginComp.module.css";
import Icon from '@leafygreen-ui/icon';
import { Modal, Container } from 'react-bootstrap';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { H2, Subtitle, Description } from '@leafygreen-ui/typography';
import UserComp from '../user/UserComp';

const users = ['1', '2', '3', '4', '5']
const LoginComp = () => {
    const [open, setOpen] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState('1')

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <Modal
            show={open}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen={'md-down'}
            className={styles.leafyFeel}
            onBackdropClick={false}
        >
            <Container className='p-3 h-100'>
                <div className='d-flex flex-row-reverse p-1 cursorPointer' onClick={handleClose}>
                    <Icon glyph="X" />
                </div>
                <div className={styles.modalMainCOntent}>
                    <H2 className={styles.centerText} si>Welcome to Leafy Pop-up store</H2>
                    <Subtitle className={`${styles.weightNormal} ${styles.centerText} mt-2`}>This is a MongoDB demo</Subtitle>
                    <br/>
                    <Description className={styles.descriptionModal}>
                        Please select a the user you would like to login as
                    </Description>
                    <div className={`${styles.usersContainer}`}>
                        {
                            users.map((user, index) => (
                                <UserComp key={index} user={user}></UserComp>
                            ))
                        }
                    </div>
                    <Description className={`${styles.descriptionModal} mb-3`}>
                        Note: Each user has pre-loaded data, such as past orders and items in their cart, with content unique to them. This variation is designed to showcase different scenarios, providing a more dynamic and realistic user experience for the demo.
                    </Description>
                </div>
            </Container>
        </Modal>
    );
};


export default LoginComp;