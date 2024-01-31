import styles from './searchBar.module.css';
import Image from "next/image";
import TextInput from "@leafygreen-ui/text-input";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";



const SearchBar = () => {
    return (

        <div className={styles.searchContainer}>
            <LeafyGreenProvider>
                <TextInput
                    label="Label"
                    description="Description"
                    placeholder="Placeholder"
                />
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
