// src/componnets/login/lupapassword.jsx (LUPA PASSWORD FORM)

import React, { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react';

import logo from '../../componnets/assest/logo.png';
import './LupaPassword.css';

// GANTI NAMA FUNGSI INI DARI 'lupapassword' MENJADI 'LupapasswordForm'
export default function LupapasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Mohon masukkan alamat email Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('@')) {
        setMessage('reset password telah dikirim ke email Anda.');
        setEmail('');
      } else {
        setError('Email tidak terdaftar atau format email salah.');
      }
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="form-lupapassword-card">

        <div className="icon-lupapassword-container">
          <div className="icon-box-lupapassword">
            <img src={logo} alt="Logo" className="icon-box-image-lupapassword" />
          </div>
        </div>

        <h1 className="main-lupapassword">Lupa Password</h1>
        <h2 className="subtitle-lupapassword">Reset Kata Sandi Anda</h2>

        <div className="decorative-line short-line">
          <div className="dot"></div>
          <div className="line"></div>
          <div className="dot"></div>
        </div>

        {error && (
          <div className="error-message shake">
            <AlertCircle className="error-icon" />
            <span className="error-text">{error}</span>
          </div>
        )}

        {message && (
          <div className="success-message">
            <Mail className="success-icon" />
            <span className="success-text">{message}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">

          <div>
            <label className="input-text" htmlFor="reset-email">Email*</label>
            <div className="input-wrapper">
              <Mail className="input-icon-email" />
              <input
                id="reset-email"
                type="email"
                placeholder="Masukkan email terdaftar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field-lupapassword"
                disabled={isLoading || message}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading || message} className={`reset-btn full-width mt-5 ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <>
                <div className="spinner-lupapassword"></div>
                <span>Mengirim...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4">
          <button
            type="button"
            className="btn-bottom-link text-center w-full"
            disabled={isLoading}
            onClick={onSwitchToLogin}
          >
            <ArrowLeft className="inline-icon" />
            Kembali ke Halaman Masuk
          </button>
        </div>

      </div>
    </div>
  );
}