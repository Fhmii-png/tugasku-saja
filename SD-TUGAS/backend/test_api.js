const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log("--- Mulai Testing API ---");

    // 1. Tambah Mahasiswa
    console.log("\n1. Menambahkan Mahasiswa...");
    const studentData = { nim: "101", nama: "Alpha", jurusan: "Teknik Informatika" };
    const addRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, studentData);
    console.log(`Status: ${addRes.status}`);
    console.log("Respons:", addRes.body);

    // 2. Lihat Daftar Mahasiswa
    console.log("\n2. Mengambil Daftar Mahasiswa...");
    const getRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa', method: 'GET'
    });
    console.log("Data Mahasiswa:", getRes.body.data);

    // 3. Lihat History Stack
    console.log("\n3. Mengambil History Stack...");
    const stackRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/history', method: 'GET'
    });
    console.log("History Stack:", stackRes.body.data);

    // 4. Hapus Mahasiswa
    console.log("\n4. Menghapus Mahasiswa 101...");
    const delRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa/101', method: 'DELETE'
    });
    console.log(`Status: ${delRes.status}`);
    console.log("Respons:", delRes.body);

    // 5. Lihat History Stack lagi
    console.log("\n5. Cek Stack Setelah Hapus...");
    const stackRes2 = await request({
        hostname: 'localhost', port: 5001, path: '/api/history', method: 'GET'
    });
    console.log("History Stack:", stackRes2.body.data);

    // 6. Undo
    console.log("\n6. Melakukan Undo (Kembalikan yang dihapus)...");
    const undoRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/undo', method: 'POST'
    });
    console.log("Respons Undo:", undoRes.body);

    // 7. Cek Daftar Mahasiswa Akhir
    console.log("\n7. Cek Daftar Mahasiswa (Harusnya 101 kembali)...");
    const finalRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa', method: 'GET'
    });
    console.log("Data Mahasiswa:", finalRes.body.data);

    console.log("\n--- Testing Selesai ---");
}

runTests();
