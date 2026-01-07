import "./judul.css";

function Judul() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="judul1">
      <h2>Mengisi Absensi</h2>
      <span>{today}</span>
    </div>
  );
}

export default Judul;
