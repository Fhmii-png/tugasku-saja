import { useState } from "react";
import "./Rekap.css";

function Table() {
  const [attendanceData] = useState([
    { tanggal: '1 nov 2025', materi: 'juz 12', status: 'hadir', catatan: 'lancar membaca' },
    { tanggal: '2 nov 2025', materi: 'juz 12', status: 'hadir', catatan: '-' },
    { tanggal: '3 nov 2025', materi: 'juz 12', status: 'sakit', catatan: '-' },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState("hari");

  const totalKehadiran = 18;
  const izin = 1;
  const sakit = 1;
  const alpa = 0;
  const presentasiKehadiran = 90;

  return (
    <div>
      <div className="filter-container1">
       
        <label className="filter-label1">Pilih Periode Waktu</label>

        <div className="filter-controls1">
          <select 
            className="filter-select1"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="hari">hari ini</option>
            <option value="minggu">minggu ini</option>
            <option value="bulan">bulan ini</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">total kehadiran</div>
            <div className="stat-value stat-blue">{totalKehadiran}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">izin</div>
            <div className="stat-value stat-yellow">{izin}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">sakit</div>
            <div className="stat-value stat-green">{sakit}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">alpa</div>
            <div className="stat-value stat-red">{alpa}</div>
          </div>
        </div>

        {/* Presentasi */}
        <div className="presentasi-card">
          <div className="stat-label">presentasi kehadiran</div>
          <div className="stat-value stat-blue">{presentasiKehadiran}%</div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="rekap-table1">
            <thead>
              <tr>
                <th>tanggal</th>
                <th>materi</th>
                <th>status</th>
                <th>cacatan guru</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, index) => (
                <tr key={index}>
                  <td>{row.tanggal}</td>
                  <td>{row.materi}</td>
                  <td>
                    <span className={`status ${
                      row.status === 'hadir' ? 'status-hadir' : 
                      row.status === 'sakit' ? 'status-sakit' : 
                      'status-izin'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;