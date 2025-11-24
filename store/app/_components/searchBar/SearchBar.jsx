"use client";

import { useSelector, useDispatch } from 'react-redux';
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";

import styles from './searchBar.module.css';
import { SearchInput } from "@leafygreen-ui/search-input";
import { getProductsWithSearch } from '../../_lib/api';
import { SEARCH_TYPES } from '../../_lib/constants';
import { setLoading, setProducts, setQuery } from '../../../redux/slices/ProductsSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchType = useSelector(state => state.Products.searchType);
    const query = useSelector(state => state.Products.query);
    const filters = useSelector(state => state.Products.filters);
    
    const onSearchSubmit = async () => {
        let response;
        dispatch(setLoading(true));

        if (searchType === SEARCH_TYPES.atlasSearch)
            response = await getProductsWithSearch(query, filters);

        if (response) {
            dispatch(
                setProducts({
                    products: response.products,
                    totalItems: response.totalItems,
                })
            );
        }
    };

    const setSearchQuery = (searchQuery) => {
        dispatch(setQuery(searchQuery));
    };

    return (
        <div className={styles.searchContainer}>
            <LeafyGreenProvider>
                <div className={styles.searchToggle}>
                    <SearchInput 
                        aria-label="Label"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onSubmit={() => onSearchSubmit()}
                        value={query}
                        defaultValue=""
                    />
                </div>
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
