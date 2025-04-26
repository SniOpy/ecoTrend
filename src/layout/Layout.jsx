import React, { useState } from 'react';
import Navbar from '../reusable-ui/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import LayoutContext from '../context/LayoutContext.jsx';
import styled from 'styled-components';
import { useProduct } from '../hooks/useProduct.jsx';

export default function Layout() {
  const [cartItems, setCartItems] = useState([]);
  const { handleAdd, handleRedirection } = useProduct();

  const layoutContext = {
    cartItems,
    setCartItems,
    handleAdd,
    handleRedirection,
  };
  return (
    <LayoutContext.Provider value={layoutContext}>
      <LayoutStyled>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </LayoutStyled>
    </LayoutContext.Provider>
  );
}

const LayoutStyled = styled.div``;
