import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import Homepage from './components/pages/Homepage';
import ErrorPage from './components/error/ErrorPage.jsx';
import Subscribe from './components/pages/Subscribe.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
