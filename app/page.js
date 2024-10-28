"use client"

import { useEffect } from "react";
import { useDispatch } from 'react-redux';

import styles from "./page.module.css";
import "./fonts.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";
import HomeComp from "./_components/homeComp/HomeComp";
import LoginComp from "./_components/login/LoginComp";
import { setLoadingUsersList, setSelectedUser, setUsersList } from '@/redux/slices/UserSlice';
import { fetchUsers } from '@/lib/api';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await fetchUsers();
        if(result){
          dispatch(setUsersList(result))
          if(result.length > 0)
            dispatch(setSelectedUser(result[0]))
        }
        dispatch(setLoadingUsersList(false))
      } catch (err) {

      }
    };

    getAllUsers();

    return () => {}
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <HomeComp></HomeComp>
      <Footer></Footer>
      <LoginComp></LoginComp>
    </>
  );
}
