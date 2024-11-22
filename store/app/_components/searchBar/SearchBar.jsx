"use client";

import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from "react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Toggle from "@leafygreen-ui/toggle";

import styles from './searchBar.module.css';
import { SearchInput } from "@leafygreen-ui/search-input";
import { Label } from '@leafygreen-ui/typography';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { getProductsWithSearch, getProductsWithVectorSearch } from '../../_lib/api';
import { SEARCH_TYPES } from '../../_lib/constants';
import { setLoading, setProducts, setSearchTypeValue } from '../../../redux/slices/ProductsSlice';


const SearchBar = () => {
    const dispatch = useDispatch();
    const searchType = useSelector(state => state.Products.searchType)
    const searchIsLoading = useSelector(state => state.Products.searchIsLoading)
    const [searchQuery, setSearchQuery] = useState('')
    
    const onSearchSubmit = async () => {
        let response;
        dispatch(setLoading(true))
        if(searchType === SEARCH_TYPES.atlasSearch)
            response = await getProductsWithSearch(searchQuery)
        else if (searchType === SEARCH_TYPES.vectorSearch)
            response = await getProductsWithVectorSearch(searchQuery)
        if(response){
            dispatch(setProducts(response))
        }
    }
    const onSearchTypeChange = (checked) => {
        console.log('onSearchTypeChange', checked)
        const type = checked
            ? SEARCH_TYPES.vectorSearch
            : SEARCH_TYPES.atlasSearch
        dispatch(setSearchTypeValue(type))
    }

    return (
        <div className={styles.searchContainer}>
            <LeafyGreenProvider>
                <div className={styles.searchToggle}>
                    <SearchInput 
                        aria-label="Label"
                        onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                        onSubmit={() => onSearchSubmit()}
                        value={searchQuery} // Use 'value' to make it a controlled component
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
                            onChange={(checked) => onSearchTypeChange(checked)}
                        />
                    </div>
                </div>
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
