import "./button.css";

function Submitbutton() {
    function tombolsubmit() {
        alert('Absensi Berhasil disimpan');
    }
    return (
        <div className="simpan">
            <button class="simpan1" type="submit" onClick={tombolsubmit}>
                Simpan Absensi</button>
        </div>
    );
}

export default Submitbutton;