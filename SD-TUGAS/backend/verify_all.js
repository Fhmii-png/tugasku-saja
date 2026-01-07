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

async function verifyAll() {
    console.log("=== VERIFIKASI SISTEM SECARA KESELURUHAN ===");
    const timestamp = Date.now();
    const newUser = {
        namaLengkap: "Test User Full",
        email: `test${timestamp}@example.com`,
        username: `user${timestamp}`,
        password: "password123",
        role: "ustadz",
        nohandphone: "0812345678"
    };

    // 1. REGISTER
    console.log(`\n[1] Register User Baru [${newUser.username}]...`);
    const regRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/register', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, newUser);
    console.log(`Status: ${regRes.status} | Msg: ${regRes.body.message || regRes.body.error}`);

    // 2. LOGIN
    console.log(`\n[2] Login User [${newUser.username}]...`);
    const loginRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/login', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { username: newUser.username, password: newUser.password });
    console.log(`Status: ${loginRes.status} | Msg: ${loginRes.body.message || loginRes.body.error}`);

    // 3. TAMBAH MAHASISWA
    console.log(`\n[3] Tambah Mahasiswa (Linked List + Stack)...`);
    const mhsData = { nim: `NIM${timestamp}`, nama: "Santri Baru", jurusan: "Tahfidz" };
    const addRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/mahasiswa', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, mhsData);
    console.log(`Status: ${addRes.status} | Msg: ${addRes.body.message}`);

    // 4. UNDO
    console.log(`\n[4] Test Undo (Stack Pop)...`);
    const undoRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/undo', method: 'POST'
    });
    console.log(`Status: ${undoRes.status} | Msg: ${undoRes.body.message}`);

    console.log("\n=== VERIFIKASI SELESAI ===");
}

verifyAll();
