import "./button-rekap.css";

function Submitbutton () {
    function tombolsubmit () {
        alert ('Absensi Berhasil disimpan');
    }
    return (
        <div>
            <button class = "simpan" type = "submit" onClick = {tombolsubmit}>
                Simpan Absensi</button>
        </div>
    );
}

export default Submitbutton;