const express = require('express');
const cors = require('cors');
const Stack = require('./structures/Stack');
const SingleLinkedList = require('./structures/SingleLinkedList');
const Queue = require('./structures/Queue');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const UserLinkedList = require('./structures/UserLinkedList');

// ... (existing imports)

// Inisialisasi Struktur Data
const actionHistory = new Stack();
const studentList = new SingleLinkedList();
const userList = new UserLinkedList(); // Linked List untuk User
const attendanceQueue = new Queue(); // Queue untuk pemrosesan absensi

// Seed admin user
userList.addUser({
    namaLengkap: "Admin",
    username: "admin",
    email: "admin@test.com",
    role: "admin",
    password: "123"
});

// Seed data santri awal
studentList.add({ nim: "1001", nama: "Ahmad", jurusan: "Iqra 1", id: "1001" });
studentList.add({ nim: "1002", nama: "Siti", jurusan: "Iqra 2", id: "1002" });
studentList.add({ nim: "1003", nama: "Budi", jurusan: "Al-Quran", id: "1003" });

// --- Routes ---

// AUTH: REGISTER
app.post('/api/register', (req, res) => {
    try {
        const { namaLengkap, email, nohandphone, role, password, username } = req.body;

        // Gunakan email sebagai username jika username tidak dikirim (case frontend form register)
        const finalUsername = username || email.split('@')[0];

        const newUser = {
            namaLengkap,
            email,
            nohandphone,
            role,
            password,
            username: finalUsername
        };

        const success = userList.addUser(newUser);

        if (!success) {
            return res.status(400).json({ error: 'Email sudah terdaftar!' });
        }

        res.status(201).json({
            status: 'success',
            message: 'Registrasi berhasil',
            data: { username: finalUsername, role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AUTH: LOGIN
app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body;

        const user = userList.verifyUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Username atau Password salah!' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Login berhasil',
            token: 'dummy-token-12345', // Token dummy agar frontend tidak error
            user: { // Sesuaikan struktur response agar cocok dengan frontend (response.user)
                username: user.username,
                nama: user.namaLengkap,
                role: user.role,
                email: user.email
            },
            data: { // Tetap simpan data lama untuk kompatibilitas
                username: user.username,
                nama: user.namaLengkap,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 1. Ambil semua mahasiswa (Linked List)
// ... (rest of the file)

// 1. Ambil semua mahasiswa (Linked List)
app.get('/api/mahasiswa', (req, res) => {
    try {
        const students = studentList.getAll();
        res.status(200).json({
            status: 'success',
            data: students
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Tambah mahasiswa (Linked List + Stack Push)
app.post('/api/mahasiswa', (req, res) => {
    try {
        const { nim, nama, jurusan } = req.body;
        if (!nama) {
            return res.status(400).json({ error: 'Nama wajib diisi' });
        }

        const finalNim = nim || `ID-${Date.now()}`;
        const newStudent = { nim: finalNim, nama, jurusan, id: finalNim }; // Gunakan NIM sebagai ID sederhana

        // Operasi Linked List
        studentList.add(newStudent);

        // Operasi Stack (Catat histori)
        actionHistory.push({
            action: 'ADD',
            data: newStudent,
            timestamp: new Date()
        });

        res.status(201).json({
            status: 'success',
            message: 'Mahasiswa berhasil ditambahkan',
            data: newStudent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Update Data Santri (Linked List)
app.put('/api/mahasiswa/:nim', (req, res) => {
    try {
        const { nim } = req.params;
        const { nama, jurusan } = req.body;

        const updated = studentList.update(nim, { nama, jurusan });

        if (updated === -1) {
            return res.status(404).json({ error: 'Santri tidak ditemukan' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Data santri berhasil diperbarui',
            data: updated
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Update Kehadiran (Linked List)
app.put('/api/mahasiswa/:nim/attendance', (req, res) => {
    try {
        const { nim } = req.params;
        const { status } = req.body;

        const students = studentList.getAll();
        const student = students.find(s => s.nim === nim);

        if (!student) {
            return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
        }

        // Simpan status kehadiran terakhir ke dalam objek data di Linked List
        student.kehadiran = status;
        student.lastUpdate = new Date().toLocaleDateString('id-ID');

        res.status(200).json({
            status: 'success',
            message: `Kehadiran ${student.nama} diperbarui menjadi ${status}`,
            data: student
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Hapus mahasiswa (Linked List + Stack Push)
app.delete('/api/mahasiswa/:nim', (req, res) => {
    try {
        const { nim } = req.params;

        // Operasi Linked List
        const removedStudent = studentList.remove(nim);

        if (removedStudent === -1) {
            return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
        }

        // Operasi Stack (Catat histori)
        actionHistory.push({
            action: 'REMOVE',
            data: removedStudent,
            timestamp: new Date()
        });

        res.status(200).json({
            status: 'success',
            message: 'Mahasiswa berhasil dihapus',
            data: removedStudent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Undo aksi terakhir (Stack Pop + Linked List Reverse Op)
app.post('/api/undo', (req, res) => {
    try {
        if (actionHistory.isEmpty()) {
            return res.status(400).json({ error: 'Tidak ada aksi untuk di-undo' });
        }

        const lastAction = actionHistory.pop();
        let message = '';

        if (lastAction.action === 'ADD') {
            // Jika aksi sebelumnya menambah, maka undo-nya adalah menghapus
            studentList.remove(lastAction.data.nim);
            message = `Undo ADD: Mahasiswa ${lastAction.data.nama} dihapus kembali`;
        } else if (lastAction.action === 'REMOVE') {
            // Jika aksi sebelumnya menghapus, maka undo-nya adalah menambah kembali
            studentList.add(lastAction.data);
            message = `Undo REMOVE: Mahasiswa ${lastAction.data.nama} dikembalikan`;
        }

        res.status(200).json({
            status: 'success',
            message: message,
            undoDetail: lastAction
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Lihat History Stack
app.get('/api/history', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: actionHistory.printStack()
    });
});

// 6. Rekap Statistik (REKAP)
app.get('/api/rekap/stats', (req, res) => {
    try {
        const students = studentList.getAll();
        const stats = {
            total: students.length,
            hadir: students.filter(s => s.kehadiran === 'Hadir').length,
            izin: students.filter(s => s.kehadiran === 'Izin').length,
            alfa: students.filter(s => (s.kehadiran === 'Alfa' || s.kehadiran === 'alpha')).length,
            belumAbsen: students.filter(s => !s.kehadiran).length
        };
        res.status(200).json({
            status: 'success',
            data: stats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. Submit Absensi via Queue (MENGISI ABSENSI)
app.post('/api/absensi/submit', (req, res) => {
    try {
        const { nim, status } = req.body;
        const students = studentList.getAll();
        const student = students.find(s => s.nim === nim || s.id === nim);

        if (!student) {
            return res.status(404).json({ error: 'Santri tidak ditemukan' });
        }

        // Masukkan ke antrean (Queue)
        attendanceQueue.enqueue({
            nim,
            nama: student.nama,
            status,
            timestamp: new Date()
        });

        // Proses item dari queue (FIFO)
        const processedAction = attendanceQueue.dequeue();

        // Update data utama
        student.kehadiran = processedAction.status;
        student.lastUpdate = new Date().toLocaleString('id-ID');

        res.status(200).json({
            status: 'success',
            message: `Absensi ${student.nama} berhasil diproses via Queue`,
            data: student
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. Lihat Antrean Absensi (Queue)
app.get('/api/absensi/queue', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: attendanceQueue.getAll()
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
