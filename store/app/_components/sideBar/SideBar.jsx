"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./sideBar.module.css";

import { Subtitle, Body } from "@leafygreen-ui/typography";
import Checkbox from "@leafygreen-ui/checkbox";
import Toggle from "@leafygreen-ui/toggle";
import TalkTrackContainer from "../talkTrackContainer/talkTrackContainer";
import { shopPageDynamicPricing } from "@/app/_lib/talkTrack";
import Button from "@leafygreen-ui/button";

function Sidebar({ onFilterChange }) {
  const filters = useSelector((state) => state.Products.filters);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [facets, setFacets] = useState([]);
  const [isScriptRunning, setIsScriptRunning] = useState(false);
  const [showSignImagesSection, setShowSignImagesSection] = useState(false);

  useEffect(() => {
    const fetchFacets = async () => {
      try {
        const response = await axios.post("/api/getFacets");
        setFacets(response.data.facets);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchFacets();
  }, []);

  // Keyboard shortcut to toggle sign images section (Shift + Ctrl/Cmd + D)
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Key pressed:', event.key, 'altKey:', event.altKey, 'ctrlKey:', event.ctrlKey, 'metaKey:', event.metaKey, 'shiftKey:', event.shiftKey);
      
      // Check for Shift + Ctrl/Cmd + D key combination (works on both Mac and Windows)
      // On Mac: Shift + Cmd + D (metaKey), On Windows/Linux: Shift + Ctrl + D (ctrlKey)
      if (event.shiftKey && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault(); // Prevent any default browser behavior
        setShowSignImagesSection(prev => {
          const newValue = !prev;
          return newValue;
        });
      }
      
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);
    console.log('Keyboard event listener added');

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      console.log('Keyboard event listener removed');
    };
  }, []); // Remove dependency to avoid re-registering the event listener

  const handleBrandChange = (event) => {
    const item = event;
    let updatedSelectedBrands = [...selectedBrands];

    if (selectedBrands.includes(item)) {
      updatedSelectedBrands = selectedBrands.filter((g) => g !== item);
    } else {
      updatedSelectedBrands = [...selectedBrands, item];
    }
    setSelectedBrands(updatedSelectedBrands);
    onFilterChange({ ...filters, selectedBrands: updatedSelectedBrands });
  };

  const handleCategoryChange = (event) => {
    const item = event;
    let updatedSelectedCategories = selectedCategories;

    if (selectedCategories.includes(item)) {
      updatedSelectedCategories = selectedCategories.filter((g) => g !== item);
    } else {
      updatedSelectedCategories = [...selectedCategories, item];
    }
    setSelectedCategories(updatedSelectedCategories);
    onFilterChange({
      ...filters,
      selectedCategories: updatedSelectedCategories,
    });
  };

  const signImages = async () => {
    try {
      console.log("Calling sign images action...");

      const response = await axios.post("/api/bucketSigner");
      console.log("Microservice response:", response);

      if (response.data.success) {
        console.log(`sign images response:`, response.data.message);
      } else {
        console.error(`sign images failed:`, response.data.error);
      }
    } catch (error) {
      console.error("Error signing images:", error);
    }
  };

  const toggleScript = async () => {
    const newState = !isScriptRunning;
    setIsScriptRunning(newState);

    try {
      const action = newState ? "start" : "stop";
      console.log(`Calling ${action} action...`);

      const response = await axios.post("/api/toggleScript", { action });

      if (response.data.success) {
        console.log(`${action} response:`, response.data.message);
      } else {
        console.error(`${action} failed:`, response.data.error);
        // Revert the state if the API call failed
        setIsScriptRunning(!newState);
      }
    } catch (error) {
      console.error("Error toggling the script:", error);
      // Revert the state if the API call failed
      setIsScriptRunning(!newState);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.openStoreSection}>
        <div className={styles.openStore}>
          <Subtitle className={styles.subtitle}>Open Store</Subtitle>
          <TalkTrackContainer
            sections={shopPageDynamicPricing}
            openModalIsButton={false}
          />
        </div>
        <Toggle
          checked={isScriptRunning}
          onChange={toggleScript}
          aria-label="Script toggle"
          className={styles.toggle}
        />
      </div>
      {showSignImagesSection && (
        <div id="signImagesSection" className={styles.openStoreSection}>
          <div className={styles.openStore}>
            <Subtitle className={styles.subtitle}>Sign Images</Subtitle>
            <TalkTrackContainer
              sections={shopPageDynamicPricing}
              openModalIsButton={false}
            />
          </div>
          <Button onClick={signImages}>Sign Images</Button>
        </div>
      )}
      <hr className={styles.hr}></hr>

      <Subtitle>Filters</Subtitle>

      <>
        <div className={styles.brand}>
          <Body className={styles.filterTitle}>Brand</Body>

          <div className={styles.checkboxList}>
            {facets?.[0]?.facet?.brand?.buckets?.map((bucket) => (
              <Checkbox
                key={bucket._id}
                label={`${bucket._id}`} //(${bucket.count})
                checked={selectedBrands.includes(bucket._id)}
                onChange={() => handleBrandChange(bucket._id)}
                className={styles.checkbox}
              />
            ))}
          </div>
        </div>

        <hr className={styles.hr}></hr>

        <div className={styles.brand}>
          <Body className={styles.filterTitle}>Type of Product</Body>

          <div className={styles.checkboxList}>
            {facets?.[0]?.facet?.masterCategory?.buckets?.map((bucket) => (
              <Checkbox
                key={bucket._id}
                label={`${bucket._id}`} //(${bucket.count})
                checked={selectedCategories.includes(bucket._id)}
                onChange={() => handleCategoryChange(bucket._id)}
                className={styles.checkbox}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default Sidebar;
