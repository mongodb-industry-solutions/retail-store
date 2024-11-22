"use client";

import styles from './searchBar.module.css';
import { useRef, useEffect, useState } from "react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Toggle from "@leafygreen-ui/toggle";

import { SearchInput } from "@leafygreen-ui/search-input";
import { Label } from '@leafygreen-ui/typography';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { getProductsWithSearch } from '../../_lib/api';


const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const onSearchSubmit = async () => {
        const data = await getProductsWithSearch(searchValue)
        console.log('onSearchSubmit', data)
    }

    return (
        <div className={styles.searchContainer}>
            <LeafyGreenProvider>
                <div className={styles.searchToggle}>
                    <SearchInput 
                        aria-label="Label"
                        onChange={(e) => setSearchValue(e.target.value)} // Update state on change
                        onSubmit={() => onSearchSubmit()}
                        value={searchValue} // Use 'value' to make it a controlled component
                        defaultValue=''
                    />
                    <div className={styles.searchToggleContainer}>
                        <InfoSprinkle className={styles.infoSprinkle}>
                            Enable vector search for smart results
                        </InfoSprinkle>
                        <Label  className={styles.toggleLabel}>Vector Search</Label>
                        <Toggle
                            aria-label="Dark mode toggle"
                            className={styles.toggle}
                            size='small'
                        />
                    </div>
                </div>
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
