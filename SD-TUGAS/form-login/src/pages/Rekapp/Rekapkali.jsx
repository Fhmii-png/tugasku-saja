import Judul from "./Judul-rekap";
import Rekap from "../RekapAbsensi/Rekap";
import Table from "../Rekapp/Table"; 
// import Tabelrifky from "../Rekapp/Tabelrikfy";


function Rekapkali({ setDashboardPage }) {
  return (
    <div>
      <Judul />
      
      <Table />
      
      {/* <Tabelrifky/> */}
      {/* TERUSKAN setDashboardPage ke Rekap */}
      <Rekap setDashboardPage={setDashboardPage} />
    </div>

    
  );
}

export default Rekapkali;
