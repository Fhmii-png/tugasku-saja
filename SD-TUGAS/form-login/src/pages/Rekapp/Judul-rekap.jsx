import "./judul-rekap.css";

function Judul() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="judul3">
      <h2>Hasil Rekap Absensi</h2>
      <span>{today}</span>
    </div>
  );
}

export default Judul;
