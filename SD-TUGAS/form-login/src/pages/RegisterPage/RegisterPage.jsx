// src/componnets/login/login.jsx (REGISTRASI FORM)

import React, { useState } from 'react';
import {
  User, Lock, Mail, Phone, Save, AlertCircle
} from 'lucide-react';
import { authAPI } from '../../services/api';

import logo from '../../componnets/assest/logo.png';
import './Register.css';

// Menerima prop onSwitchToLogin (Aksi POP) dari App.js
export default function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    namaLengkap: '', email: '', nohandphone: '', role: '',
    password: '', konfirmasiPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.konfirmasiPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password minimal harus 6 karakter.');
      return;
    }

    // Cek apakah semua field required sudah terisi
    const requiredFields = ['namaLengkap', 'email', 'nohandphone', 'role', 'password', 'konfirmasiPassword'];
    const isFormValid = requiredFields.every(field => formData[field].trim());
    if (!isFormValid) {
      setError('Mohon isi semua field yang bertanda *');
      return;
    }

    setIsLoading(true);
    try {
      // Panggil API register
      await authAPI.register(formData.email, formData.password, formData.namaLengkap, formData.role);

      setSuccess('Pendaftaran Berhasil! Silahkan login menggunakan akun Anda.');

      // Reset form
      setFormData({
        namaLengkap: '', email: '', nohandphone: '', role: '',
        password: '', konfirmasiPassword: '',
      });

      // Setelah berhasil mendaftar, kembali ke halaman Login (POP) setelah 1.5 detik
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="subtitle">Daftar Akun</h2>

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

        {success && (
          <div className="success-message shake">
            <span className="success-text">{success}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Nama Lengkap */}
          <div>
            <label className="input-label required" htmlFor="namaLengkap">Nama Lengkap</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input id="namaLengkap" type="text" placeholder="Masukkan nama lengkap" value={formData.namaLengkap} onChange={handleChange} className="input-field" disabled={isLoading} required />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="input-label required" htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input id="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} className="input-field" disabled={isLoading} required />
            </div>
          </div>

          {/* No. Handphone */}
          <div>
            <label className="input-label required" htmlFor="nohandphone">No. Handphone</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input id="nohandphone" type="tel" placeholder="08123456789" value={formData.nohandphone} onChange={handleChange} className="input-field" disabled={isLoading} required />
            </div>
          </div>

          {/* Daftar sebagai* (Role) */}
          <div>
            <label className="input-label required" htmlFor="role">Daftar sebagai</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <select id="role" value={formData.role} onChange={handleChange} className="input-field select-field" disabled={isLoading} required>
                <option value="" disabled>Pilih role...</option>
                <option value="ustadz">Ustadz/Ustadzah</option>
                <option value="murid">Orang Tua</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="input-label required" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input id="password" type="password" placeholder="Minimal 6 Karakter" value={formData.password} onChange={handleChange} className="input-field" disabled={isLoading} required minLength="6" />
            </div>
          </div>

          {/* Konfirmasi ulang password */}
          <div>
            <label className="input-label required" htmlFor="konfirmasiPassword">Konfirmasi ulang password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input id="konfirmasiPassword" type="password" placeholder="Minimal 6 Karakter" value={formData.konfirmasiPassword} onChange={handleChange} className="input-field" disabled={isLoading} required minLength="6" />
            </div>
          </div>

          {/* Tombol Daftar */}
          <button type="submit" disabled={isLoading} className={`main-btn full-width mt-5 ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Mendaftar...</span>
              </>
            ) : (
              <>
                <Save className="btn-icon" />
                <span>Daftar</span>
              </>
            )}
          </button>
        </form>

        {/* Tombol KEMBALI KE LOGIN: Memicu POP dari Stack Register */}
        <div className="mt-4 pt-4">
          <button
            type="button"
            className="btn-bottom-link"
            disabled={isLoading}
            onClick={onSwitchToLogin} // <-- POP VIEW_LOGIN
          >
            Sudah punya akun? Masuk di sini.
          </button>
        </div>

      </div>
    </div>
  );
}