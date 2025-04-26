import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchProducts } from './useFetchProducts.jsx';

export const useProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { products } = useFetchProducts();

  useEffect(() => {}, [cartItems]);

  const handleRedirection = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAdd = (id) => {
    // Find product to add
    const productFound = products.find((product) => product.id === id);

    if (!productFound) {
      console.log("L'identifiant de ce produit est incorrect.");
      return;
    }

    // Check if product in cart
    const indexOfProductAlreadyInCart = cartItems.findIndex((item) => item.id === productFound.id);

    // Already in cart
    if (indexOfProductAlreadyInCart !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[indexOfProductAlreadyInCart].quantity += 1;
      setCartItems(updatedCart);
      console.log('produit ajouté');
    } else {
      // add product
      const productWithQuantity = { ...productFound, quantity: 1 };
      const updatedCart = [...cartItems, productWithQuantity];
      setCartItems(updatedCart);
    }
  };

  const handleDelete = (id) => {
    const copyCartItems = [...cartItems];
    const copyCartItemsUpdated = copyCartItems.filter((product) => product.id !== id);

    setCartItems(copyCartItemsUpdated);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const total = acc + item.price * item.quantity;
    return total;
  }, 0);

  return { handleRedirection, handleAdd, totalPrice, handleDelete, cartItems, setCartItems };
};
