import React from 'react';
import './button-rekap.css';

const Logoutbutton = ({ onLogout }) => {
  return (
    <button className="logout"
      onClick={onLogout}
    >
      Logout
    </button>
  );
};

export default Logoutbutton;