"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../redux/store";

export default function ClientProvider({ children }) {
  // Initialize scheduler when app first loads
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await fetch('/api/init');
        if (response.ok) {
          const data = await response.json();
          console.log('App initialized:', data);
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };
    
    initializeApp();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}