import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/login/LoginPage';
import Homepage from './components/pages/Homepage';
import ErrorPage from './components/error/ErrorPage.jsx';
import SigninPage from './components/pages/register/SigninPage.jsx';
import AccountPage from './components/pages/account/AccountPage.jsx';
import './App.css';
import Logout from './reusable-ui/Logout.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
