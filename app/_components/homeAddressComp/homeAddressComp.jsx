import styles from './homeAddressComp.module.css'; 
import { Body } from '@leafygreen-ui/typography';


const HomeAddressComp = ({address, containerStyle}) => {
    const {street_and_number, cp, country, state, city} = address
    return (
        <div className={containerStyle}>
            <Body><strong>Address: </strong>{street_and_number}, {cp} {city}. {country}</Body>
        </div>
    );
};

export default HomeAddressComp;
