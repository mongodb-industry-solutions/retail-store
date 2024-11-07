"use client";

import React from 'react';
import PropTypes from 'prop-types';
import styles from "./teamcard.module.css";

import { H1, H2, H3, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline, Description } from '@leafygreen-ui/typography';

const TeamMemberCard = ({ photo, name, title, subtitle }) => {
  return (
    <div className={styles.teammembercard}>
      <img src={photo} alt={name} className={styles.teammemberphoto} />
      <div className={styles.teammemberdetails}>
        <Subtitle className={styles.teammembername}>{name}</Subtitle>
        <Body className={styles.teammembertitle}>{title}</Body>
        <Description className={styles.teammembersubtitle}>{subtitle}</Description>
      </div>
    </div>
  );
};

TeamMemberCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default TeamMemberCard;
