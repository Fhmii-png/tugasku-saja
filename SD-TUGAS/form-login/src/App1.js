import React, { useState } from 'react';
// Pastikan path dan nama file benar:
import LoginForm from './componnets/login/login.jsx'; // Mengacu pada file login.jsx
import RegisterForm from './componnets/login/RegisterForm.jsx'; 

function App() {
  // State untuk melacak tampilan saat ini (true = Login, false = Register)
  const [isLoginView, setIsLoginView] = useState(true);

  // Fungsi untuk mengubah status tampilan
  const toggleView = () => {
    setIsLoginView(prev => !prev);
  };

  return (
    <div className="App">
      {/* Logika Tampilan Bersyarat */}
      {isLoginView ? (
        // Tampilkan Login Form, dan kirim fungsi toggleView sebagai prop
        <LoginForm onSwitchToRegister={toggleView} />
      ) : (
        // Tampilkan Register Form, dan kirim fungsi toggleView sebagai prop
        <RegisterForm onSwitchToLogin={toggleView} />
      )}
    </div>
  );
}

export default App;