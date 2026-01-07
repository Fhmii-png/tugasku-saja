import "./cekdataM.css";
import { useState, useEffect } from "react";

import SearchBar from "../RekapAbsensi/Searchbar.jsx";
import logo from "./bocil.png";
import Buttonedit from "./buttonedit.jsx";

function CekdataM({ userRole }) {

  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nama: "", jurusan: "" });
  const [isManageMode, setIsManageMode] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa");
      const result = await response.json();
      if (result.status === "success") {
        setStudentsData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll updates
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAddSantri = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return alert("Masukkan nama santri!");
    try {
      const response = await fetch("http://localhost:5001/api/mahasiswa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newName, jurusan: "Iqra/Al-Quran" }),
      });
      if (response.ok) {
        setNewName("");
        fetchData();
        alert("Santri berhasil ditambahkan!");
      }
    } catch (error) {
      alert("Gagal menambah santri");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus data santri ini?")) return;
    try {
      const response = await fetch(`http://localhost:5001/api/mahasiswa/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
        alert("Data dihapus!");
      }
    } catch (error) {
      alert("Gagal menghapus");
    }
  };

  const handleStartEdit = (student) => {
    setEditingId(student.nim || student.id);
    setEditForm({ nama: student.nama, jurusan: student.jurusan || "Iqra/Al-Quran" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/mahasiswa/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const result = await response.json();
      if (result.status === "success") {
        setEditingId(null);
        fetchData();
        alert("Data berhasil diperbarui!");
      }
    } catch (error) {
      alert("Gagal update data");
    }
  };

  const filteredStudents = studentsData.filter(student =>
    (student.nama || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="atas">
        <div className="judul-cekdata">
          {userRole === 'ustadz' ? 'Tambah & Kelola Santri' : 'Daftar Kehadiran Anak'}
        </div>
      </div>

      {userRole === 'ustadz' && isManageMode && (
        <div style={{ margin: "10px 20px", padding: "15px", background: "rgba(255,255,255,0.8)", borderRadius: "10px", border: "2px dashed #27ae60" }}>
          <h4 style={{ marginBottom: "10px", color: "#27ae60" }}>+ Tambah Santri Baru (Cukup Nama)</h4>
          <form onSubmit={handleAddSantri} style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Nama Lengkap Santri..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <button type="submit" style={{ padding: "8px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Tambah</button>
          </form>
        </div>
      )}

      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari Nama Murid..." />
      </div>
      <div className="list-container" style={{ maxHeight: '380px', overflowY: 'auto', padding: '10px' }}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => {
            const studentId = student.nim || student.id;
            const isEditing = editingId === studentId;

            return (
              <div className="kotak" key={studentId} style={{ marginBottom: '20px', position: 'relative', borderLeft: isEditing ? '5px solid #27ae60' : 'none' }}>
                <div className="baris">
                  <span className="label" style={{ fontWeight: 'bold' }}>No. Urut</span>
                  <span className="titik">: {index + 1}</span>
                </div>

                <div className="baris">
                  <span className="label">Nama Santri</span>
                  {isEditing ? (
                    <input
                      className="edit-input"
                      value={editForm.nama}
                      onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                      style={{ marginLeft: '5px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                  ) : (
                    <span className="titik">: {student.nama}</span>
                  )}
                </div>

                <div className="baris">
                  <span className="label">Jilid/Kelas</span>
                  {isEditing ? (
                    <input
                      className="edit-input"
                      value={editForm.jurusan}
                      onChange={(e) => setEditForm({ ...editForm, jurusan: e.target.value })}
                      style={{ marginLeft: '5px', padding: '2px 5px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                  ) : (
                    <span className="titik">: {student.jurusan || "Iqra/Al-Quran"}</span>
                  )}
                </div>

                <div className="baris">
                  <span className="label">Status Kehadiran</span>
                  <span className="titik" style={{
                    color: student.kehadiran === 'Hadir' ? '#27ae60' :
                      student.kehadiran === 'Izin' ? '#f39c12' :
                        student.kehadiran === 'Alfa' ? '#e74c3c' : '#7f8c8d',
                    fontWeight: 'bold'
                  }}>
                    : {student.kehadiran || "Belum Absen"}
                  </span>
                </div>

                <div className="baris">
                  <span className="label">Terakhir Update</span>
                  <span className="titik">: {student.lastUpdate || "-"}</span>
                </div>

                {userRole === 'ustadz' && isManageMode && (
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    {isEditing ? (
                      <>
                        <button onClick={() => handleSaveEdit(studentId)} style={{ padding: '4px 12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Simpan</button>
                        <button onClick={handleCancelEdit} style={{ padding: '4px 12px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Batal</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleStartEdit(student)} style={{ padding: '4px 12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                        <button onClick={() => handleDelete(studentId)} style={{ padding: '4px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Hapus</button>
                      </>
                    )}
                  </div>
                )}

                <img src={logo} alt="Bocil" className="gambar" />
              </div>
            );
          })
        ) : (
          <div className="kotak">
            <p style={{ textAlign: "center", padding: "20px" }}>Data tidak ditemukan atau belum ada</p>
          </div>
        )}
      </div>

      {userRole === 'ustadz' && (
        <div className="tomboledit">
          <Buttonedit
            onClick={() => setIsManageMode(!isManageMode)}
            label={isManageMode ? "Selesai Mengelola" : "Edit Data"}
          />
        </div>
      )}

    </div>
  );
}
export default CekdataM;