import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutContext from '../context/LayoutContext';
import { useFetchProducts } from './useFetchProducts.jsx';

export const useProduct = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(LayoutContext);
  const { products } = useFetchProducts();

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

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

  return { handleRedirection, handleAdd };
};
