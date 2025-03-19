"use client";

import { useSelector, useDispatch } from 'react-redux';
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Toggle from "@leafygreen-ui/toggle";

import styles from './searchBar.module.css';
import { SearchInput } from "@leafygreen-ui/search-input";
import { Label } from '@leafygreen-ui/typography';
import { getProductsWithSearch, getProductsWithVectorSearch } from '../../_lib/api';
import { SEARCH_TYPES } from '../../_lib/constants';
import { setLoading, setProducts, setQuery, setSearchTypeValue } from '../../../redux/slices/ProductsSlice';
import { shopPageVectorSearch } from '@/app/_lib/talkTrack';
import TalkTrackContainer from '../talkTrackContainer/talkTrackContainer';


const SearchBar = () => {
    const dispatch = useDispatch();
    const searchType = useSelector(state => state.Products.searchType)
    const query = useSelector(state => state.Products.query)
    const filters = useSelector(state => state.Products.filters)
    
    const onSearchSubmit = async () => {
        let response;
        dispatch(setLoading(true))

        if(searchType === SEARCH_TYPES.atlasSearch)
            response = await getProductsWithSearch(query, filters)
        else if (searchType === SEARCH_TYPES.vectorSearch)
            response = await getProductsWithVectorSearch(query, filters)
        if(response){
            dispatch(
                setProducts({
                    products: response.products, 
                    totalItems: response.totalItems
                }
            ))
        }
    }
    const setSearchQuery = (searchQuery) => {
        dispatch(setQuery(searchQuery))
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
                        value={query} // Use 'value' to make it a controlled component
                        defaultValue=''
                    />
                    <div className={styles.searchToggleContainer}>
                        <Label  className={styles.toggleLabel}>Vector Search</Label>
                        <TalkTrackContainer sections={shopPageVectorSearch} openModalIsButton={false}/>
                        <Toggle
                            //disabled={true}
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
