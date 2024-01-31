"use client";

import { useState } from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import IconButton from "@leafygreen-ui/icon-button";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Icon from "@leafygreen-ui/icon";

const Profile = () => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [profileItems, setProfileItems] = useState([]);


    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <div className={styles.profileContainer}>

            <LeafyGreenProvider onClick={toggleProfile}>
                <IconButton className={styles.profileIcon} onClick={toggleProfile}>
                    <Icon glyph="Person" />
                </IconButton>
            </LeafyGreenProvider>

            {isProfileOpen && (
                <div className={styles.profilePopup}>
                    <p>Your profile</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
