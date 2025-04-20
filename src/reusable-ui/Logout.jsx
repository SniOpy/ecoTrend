import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import axios from 'axios';

export default function Logout() {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('➡️ Déconnexion appelée'); // <== À surveiller
    // try {
    //   const res = await axios.post('http://localhost:3000/logout', null, {
    //     withCredentials: true,
    //   });

    //   if (res.status === 200) {
    //     console.log('Supression localStorage');
    //     setUserData(null); // initialize state
    //     console.log('state null');

    //     navigate('/login'); // redirection to login
    //   } else {
    //     console.error('Erreur de déconnexion');
    //   }
    // } catch (error) {
    //   console.error('Erreur de requête : ', error);
    // }
  };
  return (
    <form action="">
      <button type="button" className="logout" onClick={() => alert('click')}>
        Déconnexion
      </button>
    </form>
  );
}
