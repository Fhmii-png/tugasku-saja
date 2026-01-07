import React from "react";
import { useState } from "react";
import "./navbar.css";
import "./buttonmenu.css";
import logo from "../../componnets/assest/logo.png";
import Logoutbutton from "./Logoutbutton";

function Navbar({ onLogout, setDashboardPage, userRole }) {

  const [active, setActive] = useState(userRole === 'ustadz' ? 'mengisi' : 'murid'); // default aktif sesuai role
  // fungsi untuk ganti halaman + set active
  const handleClick = (page) => {
    setDashboardPage(page); // ganti halaman utama
    setActive(page);        // set button aktif
  };

  return (
    <div className="sidebar1">
      <img src={logo} alt="logo" width={100} />
      <p>
        Absensi <br /> Mengaji
      </p>

      {/* Tampilkan Nama User & Role */}
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#ffeb3b', fontWeight: 'bold', textAlign: 'center' }}>
        Halo, {JSON.parse(localStorage.getItem('user') || '{}').nama || 'Tamu'}<br />
        <span style={{ fontSize: '10px', color: '#fff' }}>({userRole === 'ustadz' ? 'Ustadz' : 'Orang Tua'})</span>
      </div>

      {userRole === 'ustadz' && (
        <>
          <button
            className={active === "mengisi" ? "menubutton active" : "menubutton"}
            onClick={() => handleClick("mengisi")}
          >
            Mengisi Absensi
          </button>

          <button
            className={active === "rekap" ? "menubutton active" : "menubutton"}
            onClick={() => handleClick("rekap")}
          >
            Rekap Absensi
          </button>
        </>
      )}

      <button
        className={active === "murid" ? "menubutton active" : "menubutton"}
        onClick={() => handleClick("murid")}>
        Cek Data Murid
      </button>

      <Logoutbutton onLogout={onLogout} />
    </div>

  );
}

export default Navbar;
