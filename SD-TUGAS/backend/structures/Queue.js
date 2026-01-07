class Queue {
    constructor() {
        this.items = [];
    }

    // Menambahkan elemen ke antrean (FIFO)
    enqueue(element) {
        this.items.push(element);
    }

    // Mengambil elemen pertama dari antrean
    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    // Mengecek apakah antrean kosong
    isEmpty() {
        return this.items.length === 0;
    }

    // Melihat seluruh isi antrean
    getAll() {
        return this.items;
    }
}

module.exports = Queue;
