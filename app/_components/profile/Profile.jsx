"use client";

import { useState } from "react";
import { useSelector } from 'react-redux';
import Link from "next/link";

import styles from "./profile.module.css";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const selectedUser = useSelector(state => state.User.selectedUser)

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
                                <img src="/rsc/icons/circle-user-solid.svg" alt="Logo" width={18} className="me-1" />
                                <div><p className={styles.textMyProfile}>My Profile</p><small>{selectedUser.name} {selectedUser.surname}</small></div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className={styles.listGroupItem}>
                            <Link href="/orders">
                                <div className="d-flex flex-row">
                                    <img src="/rsc/icons/file-lines-solid.svg" alt="Logo" width={15} className="me-1" />
                                    <p>My Orders</p>
                                </div>
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className={styles.listGroupItem}>
                            <Link href="/cart">
                                <div className="d-flex flex-row">
<<<<<<< HEAD
                                    <img src="/rsc/icons/cart-shopping-solid.svg" alt="Shopping cart" width={18} className="me-1" />
=======
                                    <img src="rsc/icons/cart-shopping-solid.svg" alt="Shopping cart" width={18} className="me-1" />
>>>>>>> 5bd92df72e36e2be94982b5ef7cdeb5b5f7a9d5f
                                    <p>My Cart</p>
                                </div>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            )}
        </div>
    );
};

export default Profile;
