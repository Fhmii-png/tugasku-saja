class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Menambahkan data di akhir list
    add(data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    // Menghapus data berdasarkan kriteria (misal ID atau NIM)
    // Asumsi data adalah object dengan properti 'id' atau 'nim'
    remove(id) {
        let current = this.head;
        let prev = null;

        while (current != null) {
            if (current.data.id === id || current.data.nim === id) {
                if (prev === null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    // Mendapatkan semua data dalam bentuk array
    getAll() {
        let result = [];
        let current = this.head;
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }

    // Update data berdasarkan ID
    update(id, newData) {
        let current = this.head;
        while (current) {
            if (current.data.id === id || current.data.nim === id) {
                // Merge data lama dengan data baru
                current.data = { ...current.data, ...newData };
                return current.data;
            }
            current = current.next;
        }
        return -1;
    }
}

module.exports = SingleLinkedList;
