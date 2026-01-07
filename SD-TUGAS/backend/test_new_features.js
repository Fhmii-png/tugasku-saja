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
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runTests() {
    console.log("--- Testing Fitur Baru Rekap & Queue ---");

    // 1. Cek Rekap Awal
    console.log("\n1. Mengambil Rekap Statistik...");
    const rekapRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/rekap/stats', method: 'GET'
    });
    console.log("Rekap Awal:", rekapRes.body.data);

    // 2. Isi Absensi via Queue
    console.log("\n2. Mengisi Absensi Santri 1001 via Queue...");
    const absRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa/1001/attendance', method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }, { status: 'Hadir' });
    console.log("Respons Absensi:", absRes.body.message);

    // 3. Isi Absensi via Queue (Lagi)
    console.log("\n3. Mengisi Absensi Santri 1002 via Queue...");
    await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa/1002/attendance', method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    }, { status: 'Izin' });

    // 4. Cek Rekap Akhir
    console.log("\n4. Mengambil Rekap Statistik Akhir...");
    const rekapRes2 = await request({
        hostname: 'localhost', port: 5001, path: '/api/rekap/stats', method: 'GET'
    });
    console.log("Rekap Akhir:", rekapRes2.body.data);

    // 5. Cek Queue (Harusnya kosong karena langsung diproses di server.js saat ini, tapi kita cek log-nya jika ada)
    // Tadi kita dequeue langsung, jadi queue history mungkin kosong unless we add a history queue.

    console.log("\n--- Testing Selesai ---");
}

runTests();
