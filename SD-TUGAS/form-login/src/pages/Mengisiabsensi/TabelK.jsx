import { useState, useEffect } from "react";
import "./tabelK.css";

function TabelK() {
  const [data, setData] = useState([]);
  const [newStudent, setNewStudent] = useState({ nama: "" });
  const [attendance, setAttendance] = useState({}); // { studentId: status }

  // Fetch data dari backend saat komponen dimuat
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa");
      const result = await response.json();
      if (result.status === "success") {
        setData(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.nama) return alert("Isi nama santri!");

    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: newStudent.nama,
          jurusan: "Iqra/Al-Quran"
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setNewStudent({ nama: "" });
        fetchData();
        alert("Santri berhasil ditambahkan!");
      }
    } catch (error) {
      alert("Gagal menambah santri");
    }
  };

  const handleAttendanceChange = async (studentId, status) => {
    // Update state local dulu biar cepet
    setAttendance(prev => ({ ...prev, [studentId]: status }));

    try {
      await fetch(`http://localhost:5001/api/mahasiswa/${studentId}/attendance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error("Gagal update kehadiran:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/mahasiswa/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.status === "success") {
        fetchData();
        alert("Data Santri dihapus!");
      }
    } catch (error) {
      alert("Gagal menghapus santri");
    }
  };

  return (
    <div className="absensi-box1">
      {/* Form Tambah Santri Sederhana */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <h3 style={{ marginBottom: "10px", color: "#2c3e50" }}>Tambah Santri Baru</h3>
        <form onSubmit={handleAddStudent} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Masukkan Nama Lengkap Santri"
            value={newStudent.nama}
            onChange={(e) => setNewStudent({ ...newStudent, nama: e.target.value })}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <button type="submit" style={{ padding: "10px 25px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            + Tambah
          </button>
        </form>
      </div>

      <table className="absensi-table1">
        <thead>
          <tr>
            <th width="50">No</th>
            <th>Nama Santri</th>
            <th width="250">Kehadiran</th>
            <th width="100">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>Belum ada data santri</td></tr>
          ) : (
            data.map((row, index) => {
              const studentId = row.nim || row.id;
              return (
                <tr key={studentId}>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>{index + 1}</td>
                  <td style={{ textAlign: "left" }}>{row.nama}</td>
                  <td>
                    <div className="attendance-options" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      {['Hadir', 'Izin', 'Alfa'].map((status) => (
                        <label key={status} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
                          <input
                            type="radio"
                            name={`attendance-${studentId}`}
                            value={status}
                            checked={attendance[studentId] === status}
                            onChange={() => handleAttendanceChange(studentId, status)}
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(studentId)}
                      style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelK;
