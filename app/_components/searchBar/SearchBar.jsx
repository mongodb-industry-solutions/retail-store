"use client";

import styles from './searchBar.module.css';
import { useState } from "react";
import LeafyGreenProvider from "@leafygreen-ui/leafygreen-provider";
import Toggle from "@leafygreen-ui/toggle";

import {
    SearchInput,
    SearchResult,
    SearchResultGroup
} from "@leafygreen-ui/search-input";
import { Label } from '@leafygreen-ui/typography';


const SearchBar = () => {
    return (

        <div className={`${styles.searchContainer} d-none`}>
            <LeafyGreenProvider>
                <div className={styles.searchToggle}>
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

                    <Toggle
                        aria-label="Dark mode toggle"
                        className={styles.toggle}
                    />

                    <Label  className={styles.toggleLabel}>Vector Search</Label>
                </div>
            </LeafyGreenProvider>
        </div>
    );
};

export default SearchBar;
