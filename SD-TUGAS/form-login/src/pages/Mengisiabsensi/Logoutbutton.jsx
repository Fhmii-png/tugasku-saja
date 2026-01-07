import React from 'react';
import './button.css';

const Logoutbutton = ({ onLogout }) => {
  return (
    <button className='logout1' onClick={onLogout}>
      Logout
    </button>
  );
};

export default Logoutbutton;