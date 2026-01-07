import { useState } from "react";
import "./Rekap.css";


function Rekap({ students }) {
  return (
    <div className="rekap-wrapper" style={{ paddingBottom: '10px' }} >
      <div className="rekap-container" style={{ marginTop: '20px' }}>
        <table className="absensi-table1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#27ae60', color: 'white' }}>
              <th style={{ padding: '12px', width: '60px' }}>No</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Nama Santri</th>
              <th style={{ padding: '12px' }}>Jilid/Kelas</th>
              <th style={{ padding: '12px' }}>Status Terakhir</th>
              <th style={{ padding: '12px' }}>Tanggal Update</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ padding: '12px', textAlign: 'left' }}>{student.nama}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{student.jurusan || 'Iqra/Al-Quran'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: student.kehadiran === 'Hadir' ? '#27ae60' :
                        student.kehadiran === 'Izin' ? '#f39c12' :
                          student.kehadiran === 'Alfa' ? '#e74c3c' : '#7f8c8d'
                    }}>
                      {student.kehadiran || "Belum Absen"}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: '#666' }}>
                    {student.lastUpdate || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  Tidak ada data siswa
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rekap;
