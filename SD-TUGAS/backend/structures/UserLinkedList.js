class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class UserLinkedList {
    constructor() {
        this.head = null;
    }

    // Menambah user baru
    addUser(userData) {
        // Cek apakah email sudah ada (unik)
        if (this.findUserByEmail(userData.email)) {
            return false; // Email duplicate
        }

        const newNode = new Node(userData);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        return true;
    }

    // Mencari user berdasarkan email (untuk validasi register)
    findUserByEmail(email) {
        let current = this.head;
        while (current) {
            if (current.data.email === email) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Verifikasi login (email & password match)
    verifyUser(username, password) {
        let current = this.head;
        while (current) {
            // Kita asumsikan username di frontend sebenarnya mengirim "username" tapi kita simpan sebagai properti di data
            // Atau bisa jadi login pakai email. Flexible aja check dua-duanya.
            if ((current.data.username === username || current.data.email === username) && current.data.password === password) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    getAllUsers() {
        let users = [];
        let current = this.head;
        while (current) {
            users.push(current.data);
            current = current.next;
        }
        return users;
    }
}

module.exports = UserLinkedList;
