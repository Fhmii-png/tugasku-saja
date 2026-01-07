class Stack {
    constructor() {
        this.items = [];
    }

    // Menambahkan elemen ke tumpukan
    push(element) {
        this.items.push(element);
    }

    // Mengambil elemen terakhir dari tumpukan
    pop() {
        if (this.isEmpty()) return "Underflow";
        return this.items.pop();
    }

    // Melihat elemen terakhir tanpa menghapusnya
    peek() {
        if (this.isEmpty()) return "No elements in Stack";
        return this.items[this.items.length - 1];
    }

    // Mengecek apakah tumpukan kosong
    isEmpty() {
        return this.items.length === 0;
    }

    // Melihat seluruh isi stack
    printStack() {
        return this.items;
    }
}

module.exports = Stack;
