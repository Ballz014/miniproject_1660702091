"use strict";
// ธนกฤต จีนหมั้น 1660702091
var BookGenre;
(function (BookGenre) {
    BookGenre["Fiction"] = "Fiction";
    BookGenre["NonFiction"] = "Non-Fiction";
    BookGenre["Science"] = "Action";
    BookGenre["History"] = "Drama";
    BookGenre["Action"] = "Comedy";
})(BookGenre || (BookGenre = {}));
class BookLibrary {
    constructor() {
        this.bookCollection = [];
    }
    insertBook(book) {
        this.bookCollection.push(book);
        console.log(`${book.title} ถูกเพิ่มเข้าในห้องสมุด.`);
    }
    displayBooks() {
        console.log("รายชื่อหนังสือในห้องสมุด:");
        this.bookCollection.forEach(book => console.log(`- ${book.title} โดย ${book.author} (${book.genre}, ${book.publishedYear})`));
    }
    findBooksByField(field, value) {
        const foundBooks = this.bookCollection.filter(book => book[field] === value);
        if (foundBooks.length > 0) {
            console.log(`พบ: ${foundBooks[0].title} โดย ${foundBooks[0].author}`);
        }
        else {
            console.log("ไม่พบหนังสือตามเงื่อนไขที่กำหนด.");
        }
    }
    modifyBook(id, updatedFields) {
        const bookToUpdate = this.bookCollection.find(b => b.id === id);
        if (bookToUpdate) {
            Object.assign(bookToUpdate, updatedFields);
            console.log(`ข้อมูลหนังสือที่ id ${id} ถูกอัปเดต: ${JSON.stringify(bookToUpdate)}`);
        }
        else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการอัปเดต.`);
        }
    }
    removeBook(id) {
        const initialLength = this.bookCollection.length;
        this.bookCollection = this.bookCollection.filter(book => book.id !== id);
        if (this.bookCollection.length < initialLength) {
            console.log(`หนังสือที่ id ${id} ถูกลบ.`);
        }
        else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการลบ.`);
        }
    }
    saveLibraryToFile(filePath) {
        const fs = require('fs');
        fs.writeFileSync(filePath, JSON.stringify(this.bookCollection, null, 2));
        console.log(`ข้อมูลห้องสมุดถูกบันทึกลงใน ${filePath}`);
    }
    loadLibraryFromFile(filePath) {
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.bookCollection = JSON.parse(data);
            console.log(`ข้อมูลห้องสมุดถูกโหลดจาก ${filePath}`);
            if (this.bookCollection.length > 0) {
                console.log("หนังสือในห้องสมุดหลังจากโหลด:");
                this.displayBooks();
            }
            else {
                console.log("ไม่พบหนังสือในข้อมูลที่โหลดมา.");
            }
        }
        else {
            console.log(`ไม่พบไฟล์ ${filePath}.`);
        }
    }
}
const myLibrary = new BookLibrary();
myLibrary.insertBook({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: BookGenre.Fiction, publishedYear: 1925, available: true, id: 1 });
myLibrary.insertBook({ title: "The Catcher in the Rye", author: "J.D. Salinger", genre: BookGenre.Fiction, publishedYear: 1951, available: true, id: 3 });
myLibrary.insertBook({ title: "The Science of Interstellar", author: "Kip Thorne", genre: BookGenre.Science, publishedYear: 2014, available: true, id: 3 });
myLibrary.displayBooks();
console.log("ค้นหาหนังสือตามชื่อ:");
myLibrary.findBooksByField("title", "The Great Gatsby");
console.log("อัปเดตผู้เขียนของหนังสือ:");
myLibrary.modifyBook(2, { author: "Stephen Hawking (Updated)" });
console.log("ลบหนังสือออกจากห้องสมุด:");
myLibrary.removeBook(1);
console.log("รายชื่อหนังสือในห้องสมุดหลังการลบ:");
myLibrary.displayBooks();
console.log("ลบหนังสือที่ไม่มีอยู่:");
myLibrary.removeBook(999);
myLibrary.saveLibraryToFile('libraryData.json');
myLibrary.loadLibraryFromFile('libraryData.json');
