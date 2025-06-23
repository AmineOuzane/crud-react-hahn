import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/AppNavbar';
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}