import "./dashboard.css";

import Judul from "./Judul";
import TabelK from "./TabelK";
import Submitbutton from "./SubmitButton";

function Dashboard() {
  return (
    <div>
      <Judul />
      <div style={{ textAlign: "right", paddingRight: "50px", marginTop: "10px" }}>
        <button
          onClick={async () => {
            try {
              const res = await fetch("http://localhost:5001/api/undo", { method: "POST" });
              const result = await res.json();
              if (result.status === "success") {
                alert(result.message);
                // Reload page to refresh TabelK (simplest way since they are siblings)
                window.location.reload();
              } else {
                alert(result.error || "Gagal undo");
              }
            } catch (e) {
              alert("Error connect backend");
            }
          }}
          style={{ padding: "10px 20px", background: "#f39c12", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          UNDO (Stack Pop)
        </button>
      </div>
      <TabelK />
      <Submitbutton />
    </div>
  );
} export default Dashboard;
