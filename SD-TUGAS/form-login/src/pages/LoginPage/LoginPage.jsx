// src/componnets/login/login2.jsx (LOGIN FORM)

import React, { useState } from 'react';
import {
  User, Lock, LogIn, Eye, EyeOff, AlertCircle
} from 'lucide-react';
import { authAPI } from '../../services/api';

import logo from '../../componnets/assest/logo.png';
import './Login.css';

export default function LoginForm({ onSwitchToRegister, onSwitchToForgotPassword, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Isi email dan password terlebih dahulu');
      return;
    }

    setIsLoading(true);

    try {
      // Panggil API login
      const response = await authAPI.login(email, password);

      // Simpan token ke localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      console.log('Login Berhasil:', response.user);

      // --- BAGIAN PENTING: PANGGIL ONLOGINSUCCESS ---
      if (onLoginSuccess) {
        onLoginSuccess(); // Ini akan memerintahkan App.js menampilkan Navbar/Dashboard
      }

      setEmail('');
      setPassword('');
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa email dan password');
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="form-card">

        <div className="icon-container">
          <div className="icon-box">
            <img src={logo} alt="Logo" className="icon-box-image" />
          </div>
        </div>

        <h1 className="main-title">Absensi<br />Mengaji</h1>

        <p className="arabic-text" dir="rtl">
          بسم الله الرحمن الرحيم
        </p>

        <div className="decorative-line">
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

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="input-label" htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                id="login-email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="input-field"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="input-label" htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="input-field"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-btn"
                disabled={isLoading}
              >
                {showPassword ? (<EyeOff className="icon" />) : (<Eye className="icon" />)}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me-label" htmlFor="remember-me-checkbox">
              <input
                id="remember-me-checkbox"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
                disabled={isLoading}
              />
              <span>Ingat saya</span>
            </label>
            <button
              type="button"
              className="forgot-password-btn"
              disabled={isLoading}
              onClick={onSwitchToForgotPassword}
            >
              Lupa Password ?
            </button>
          </div>

          <button type="submit" disabled={isLoading} className={`main-btn ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <LogIn className="btn-icon" />
                <span>Masuk</span>
              </>
            )}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Atau</span>
            <div className="divider-line"></div>
          </div>

          <button
            type="button"
            className="secondary-btn"
            disabled={isLoading}
            onClick={onSwitchToRegister}
          >
            Daftar Akun Baru
          </button>
        </form>
      </div>
    </div>

  );

}