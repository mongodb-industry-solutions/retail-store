"use client";

import styles from './searchBar.module.css';
import { useState } from "react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import {
    SearchInput,
    SearchResult,
    SearchResultGroup
} from "@leafygreen-ui/search-input";


const SearchBar = () => {
    return (

        <div className={styles.searchContainer}>
            <LeafyGreenProvider>
                <div className="sandbox">
                    <SearchInput aria-label="Label">
                        <SearchResult
                            onClick={() => {
                                console.log("SB: Click Apple");
                            }}
                            description="This is a description"
                        >
                            Apple
                        </SearchResult>
                    </SearchInput>
                </div>
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
