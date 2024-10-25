"use client";

import { useState } from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";
import ListGroup from 'react-bootstrap/ListGroup';
import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Overline, Link } from '@leafygreen-ui/typography';

const Profile = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <div id="Profile" className={styles.profileContainer}>

            <LeafyGreenProvider onClick={toggleProfile}>
                <IconButton className={styles.profileIcon} onClick={toggleProfile} aria-label="Toggle Profile">
                    <Icon glyph="Person" />
                </IconButton>
            </LeafyGreenProvider>

            {isProfileOpen && (
                <div className={styles.profilePopup}>
                    <ListGroup>
                        <ListGroup.Item className={styles.listGroupItem}>
                            <div className="d-flex flex-row">
                                <img src="rsc/icons/circle-user-solid.svg" alt="Logo" width={18} className="me-1"/> 
                                <div><p className={styles.textMyProfile}>My Profile</p><small>Angie</small></div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className={styles.listGroupItem}>
                            <div className="d-flex flex-row">
                                <img src="rsc/icons/file-lines-solid.svg" alt="Logo" width={15} className="me-1"/>
                                <p>My Orders</p> 
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className={styles.listGroupItem}>
                            <div className="d-flex flex-row">
                                <img src="rsc/icons/cart-shopping-solid.svg" alt="Shopping cart" width={18} className="me-1"/> 
                                <p>My Cart</p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            )}
        </div>
    );
};

export default Profile;
