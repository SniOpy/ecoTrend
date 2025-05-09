import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/login/LoginPage';
import Homepage from './components/pages/Homepage';
import ErrorPage from './components/error/ErrorPage.jsx';
import SigninPage from './components/pages/register/SigninPage.jsx';
import AccountPage from './components/pages/account/AccountPage.jsx';
import Products from './components/pages/products/Products.jsx';
import Layout from './layout/Layout.jsx';
import ProductPage from './components/pages/products/ProductPage.jsx';
import Cart from './components/pages/cart/Cart.jsx';
import Blog from './components/pages/blog/Blog.jsx';
import About from './components/pages/about/About.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import Checkout from './components/pages/cart/Checkout.jsx';

import './App.css';


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
