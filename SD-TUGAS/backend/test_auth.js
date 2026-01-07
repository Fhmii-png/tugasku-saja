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

async function runAuthTests() {
    console.log("--- Mulai Testing Auth API ---");

    const registerData = {
        namaLengkap: "User Test",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
        role: "murid",
        nohandphone: "0812345"
    };

    // 1. Test Register
    console.log("\n1. Registrasi User Baru...");
    const regRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/register', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, registerData);
    console.log(`Status: ${regRes.status}`);
    console.log("Respons:", regRes.body);

    // 2. Test Login Berhasil
    console.log("\n2. Login dengan User Baru...");
    const loginRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/login', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { username: "testuser", password: "password123" });
    console.log(`Status: ${loginRes.status}`);
    console.log("Respons:", loginRes.body);

    // 3. Test Login Gagal
    console.log("\n3. Login Password Salah...");
    const failRes = await request({
        hostname: 'localhost', port: 5001, path: '/api/login', method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { username: "testuser", password: "wrongpassword" });
    console.log(`Status: ${failRes.status}`);
    console.log("Respons:", failRes.body);

    console.log("\n--- Testing Selesai ---");
}

runAuthTests();
