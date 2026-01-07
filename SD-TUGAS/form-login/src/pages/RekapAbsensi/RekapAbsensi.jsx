import { useState, useEffect } from "react";
import "./dashboard-rekap.css";
import Judul from "./Judul-rekap";
import Rekap from "./Rekap";
import SearchBar from "./Searchbar";


function RekapAbsensi({ setDashboardPage }) {

  // State untuk data
  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ total: 0, hadir: 0, izin: 0, alfa: 0, belumAbsen: 0 });

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa");
      const result = await response.json();
      if (result.status === "success") {
        setStudentsData(result.data);
      }

      // Ambil Stats dari Backend
      const statsRes = await fetch("http://localhost:5001/api/rekap/stats");
      const statsResult = await statsRes.json();
      if (statsResult.status === "success") {
        setStats(statsResult.data);
      }
    } catch (error) {
      console.error("Gagal ambil data rekap:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Update tiap 3 detik
    return () => clearInterval(interval);
  }, []);

  const filteredStudents = studentsData.filter(student =>
    (student.nama || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Judul />

      {/* SEARCH BAR */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari nama murid..."
      />

      <div className="filter-container">
        <h2 className="filter-title" style={{ textAlign: 'center', marginBottom: '10px' }}>Laporan Rekap Absensi Santri</h2>

        <div
          className="stats-summary"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            padding: '15px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <div className="stats-container">
            <div className="stat-box">
              <div className="stat-title total">Total</div>
              <div className="stat-value">{stats.total}</div>
            </div>

            <div className="stat-box">
              <div className="stat-title hadir">Hadir</div>
              <div className="stat-value">{stats.hadir}</div>
            </div>

            <div className="stat-box">
              <div className="stat-title izin">Izin</div>
              <div className="stat-value">{stats.izin}</div>
            </div>

            <div className="stat-box">
              <div className="stat-title alfa">Alfa</div>
              <div className="stat-value">{stats.alfa}</div>
            </div>

            <div className="stat-box">
              <div className="stat-title belum">Belum</div>
              <div className="stat-value">{stats.belumAbsen}</div>
            </div>
          </div>


        </div>

        <Rekap students={filteredStudents} />
      </div>


    </div>
  );
}

export default RekapAbsensi;
