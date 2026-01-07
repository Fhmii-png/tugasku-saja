import "./button.css";

function Submitbutton () {
    function tombolsubmit () {
        alert ('Absensi Berhasil disimpan');
    }
    return (
        <div>
            <button class = "simpan1" type = "submit" onClick = {tombolsubmit}>
                Simpan Absensi</button>
        </div>
    );
}

export default Submitbutton;