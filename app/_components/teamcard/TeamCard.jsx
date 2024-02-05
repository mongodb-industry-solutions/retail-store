import React from 'react';
import PropTypes from 'prop-types';
import styles from "./teamcard.module.css";

const TeamMemberCard = ({ photo, name, title, subtitle }) => {
  return (
    <div className={styles.teammembercard}>
      <img src={photo} alt={name} className={styles.teammemberphoto} />
      <div className={styles.teammemberdetails}>
        <h3 className={styles.teammembername}>{name}</h3>
        <p className={styles.teammembertitle}>{title}</p>
        <p className={styles.teammembersubtitle}>{subtitle}</p>
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
