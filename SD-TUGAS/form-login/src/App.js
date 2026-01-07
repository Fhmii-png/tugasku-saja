import React, { useState } from "react";
// import "./pages/Mengisiabsensi/dashboard.css";

import LoginForm from "./pages/LoginPage/LoginPage.jsx";
import RegisterForm from "./pages/RegisterPage/RegisterPage.jsx";
import LupapasswordForm from "./pages/ForgotPasswordPage/LupaPasswordPage.jsx";

import Navbar from "./pages/Mengisiabsensi/Navbar.jsx";
import Dashboard from "./pages/Mengisiabsensi/Dashboard.jsx";
import CekdataM from "./pages/CDmurid/CekdataM.jsx";
import RekapAbsensi from "./pages/RekapAbsensi/RekapAbsensi.jsx";
import Rekap from "./pages/Rekapp/Rekapkali.jsx";

// import DataMurid from "./pages/Mengisiabsensi/DataMurid.jsx";

// konstanta view auth
const VIEW_LOGIN = "login";
const VIEW_REGISTER = "register";
const VIEW_FORGOT_PASSWORD = "forgot_password";

function App() {
  const [view, setView] = useState(VIEW_LOGIN);
  const [dashboardPage, setDashboardPage] = useState("mengisi");

  // Mendapatkan data user dari localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'murid';

  const handleLoginSuccess = () => {
    const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (updatedUser.role === 'ustadz') {
      setDashboardPage("mengisi");
    } else {
      setDashboardPage("murid"); // Default untuk Orang Tua
    }
    setView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView(VIEW_LOGIN);
  };

  return (
    <div className="App">
      {view === "dashboard" ? (
        <div className="dashboard-layout1">
          {/* NAVBAR - Kirim role agar navbar bisa menyesuaikan menu */}
          <Navbar
            onLogout={handleLogout}
            setDashboardPage={setDashboardPage}
            dashboardPage={dashboardPage}
            userRole={role}
          />

          {/* CONTENT */}
          <div className="dashboard-content1">
            {/* TAMPILAN BERDASARKAN ROLE DAN HALAMAN YANG DIPILIH */}
            {role === 'ustadz' ? (
              <>
                {dashboardPage === "mengisi" && <Dashboard />}
                {dashboardPage === "rekap" && <RekapAbsensi setDashboardPage={setDashboardPage} />}
                {dashboardPage === "rekap1" && <Rekap setDashboardPage={setDashboardPage} />}
                {dashboardPage === "murid" && <CekdataM userRole={role} />}
              </>
            ) : (
              // Tampilan khusus Orang Tua - Langsung ke Daftar Kehadiran
              <CekdataM userRole={role} />
            )}
          </div>
        </div>
      ) : (
        <div className="auth-container">
          {view === VIEW_LOGIN && (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setView(VIEW_REGISTER)}
              onSwitchToForgotPassword={() =>
                setView(VIEW_FORGOT_PASSWORD)
              }
            />
          )}

          {view === VIEW_REGISTER && (
            <RegisterForm onSwitchToLogin={() => setView(VIEW_LOGIN)} />
          )}

          {view === VIEW_FORGOT_PASSWORD && (
            <LupapasswordForm onSwitchToLogin={() => setView(VIEW_LOGIN)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
