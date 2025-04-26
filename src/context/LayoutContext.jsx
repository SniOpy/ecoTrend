import { createContext } from 'react';

export default createContext({
  cartItems: [],
  setCartItems: () => {},

  totalPrice: () => {},
});
