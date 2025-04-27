import React, { useState } from 'react';
import Navbar from '../reusable-ui/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import LayoutContext from '../context/LayoutContext.jsx';
import styled from 'styled-components';
import { useProduct } from '../hooks/useProduct.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/pages/footer/Footer.jsx';

export default function Layout() {
  const { handleAdd, handleRedirection, totalPrice, handleDelete, cartItems, setCartItems } =
    useProduct();

  const layoutContext = {
    cartItems,
    setCartItems,
    handleAdd,
    handleRedirection,
    totalPrice,
    handleDelete,
  };
  return (
    <LayoutContext.Provider value={layoutContext}>
      <LayoutStyled>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
        />
        <Footer />
      </LayoutStyled>
    </LayoutContext.Provider>
  );
}

const LayoutStyled = styled.div``;
