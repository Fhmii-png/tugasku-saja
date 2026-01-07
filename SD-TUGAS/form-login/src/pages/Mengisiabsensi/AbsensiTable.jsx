import React, { useState } from "react";
import "./AbsensiTable.css";

function AbsensiTable() {
  const [rows, setRows] = useState([
    { id: 1, nama: "", nomor: "", status: "hadir" },
  ]);

  // ubah nilai input
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // tambah baris
  const tambahBaris = () => {
    setRows([
      ...rows,
      { id: Date.now(), nama: "", nomor: "", status: "hadir" },
    ]);
  };

  return (
    <div className="absensi-box">
      <table className="absensi-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>ID</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>

              <td>
                <input
                  type="text"
                  value={row.nama}
                  onChange={(e) =>
                    handleChange(index, "nama", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={row.nomor}
                  onChange={(e) =>
                    handleChange(index, "nomor", e.target.value)
                  }
                />
              </td>

              <td>
                <select
                  value={row.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }
                >
                  <option value="hadir">Hadir</option>
                  <option value="izin">Izin</option>
                  <option value="alpha">Alpha</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={tambahBaris}>+ Tambah Baris</button>
    </div>
  );
}

export default AbsensiTable;
