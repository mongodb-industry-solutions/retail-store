"use client"

import React from 'react';
import Icon from '@leafygreen-ui/icon';
import { Modal, Container } from 'react-bootstrap';

import styles from "./modalContainer.module.css";

const ModalContainer = (props) => {
    const {allowClose, open, setOpen, children} = props;
  
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
            backdrop="static"
        >
            <Container className='p-3 h-100'>
               {
                allowClose &&  
                <div className='d-flex flex-row-reverse p-1 cursorPointer' onClick={handleClose}>
                    <Icon glyph="X" />
                </div>
               }
               <div className={styles.contentScroll}>
                   {children}
               </div>
            </Container>
        </Modal>
    );
};

export default ModalContainer;