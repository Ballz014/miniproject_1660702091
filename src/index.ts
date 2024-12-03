// ธนกฤต จีนหมั้น 1660702091

enum BookGenre {
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Science = "Action", 
    History = "Drama", 
    Action = "Comedy", 
}

interface BookInfo {
    title: string;
    author: string;
    genre: BookGenre; 
    publishedYear: number;
    available: boolean;
    id: number;
}

class BookLibrary {
    private bookCollection: BookInfo[] = [];

    insertBook(book: BookInfo): void {
        this.bookCollection.push(book);
        console.log(`${book.title} ถูกเพิ่มเข้าในห้องสมุด.`);
    }

    displayBooks(): void {
        console.log("รายชื่อหนังสือในห้องสมุด:");
        this.bookCollection.forEach(book => console.log(`- ${book.title} โดย ${book.author} (${book.genre}, ${book.publishedYear})`));
    }

    findBooksByField(field: keyof BookInfo, value: string | number): void {
        const foundBooks = this.bookCollection.filter(book => book[field] === value);
        if (foundBooks.length > 0) {
            console.log(`พบ: ${foundBooks[0].title} โดย ${foundBooks[0].author}`);
        } else {
            console.log("ไม่พบหนังสือตามเงื่อนไขที่กำหนด.");
        }
    }

    modifyBook(id: number, updatedFields: Partial<BookInfo>): void {
        const bookToUpdate = this.bookCollection.find(b => b.id === id);
        if (bookToUpdate) {
            Object.assign(bookToUpdate, updatedFields);
            console.log(`ข้อมูลหนังสือที่ id ${id} ถูกอัปเดต: ${JSON.stringify(bookToUpdate)}`);
        } else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการอัปเดต.`);
        }
    }

    removeBook(id: number): void {
        const initialLength = this.bookCollection.length;
        this.bookCollection = this.bookCollection.filter(book => book.id !== id);
        if (this.bookCollection.length < initialLength) {
            console.log(`หนังสือที่ id ${id} ถูกลบ.`);
        } else {
            console.log(`ไม่พบหนังสือที่ id ${id} สำหรับการลบ.`);
        }
    }

    saveLibraryToFile(filePath: string): void {
        const fs = require('fs');
        fs.writeFileSync(filePath, JSON.stringify(this.bookCollection, null, 2));
        console.log(`ข้อมูลห้องสมุดถูกบันทึกลงใน ${filePath}`);
    }

    loadLibraryFromFile(filePath: string): void {
        const fs = require('fs');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            this.bookCollection = JSON.parse(data);
            console.log(`ข้อมูลห้องสมุดถูกโหลดจาก ${filePath}`);
            if (this.bookCollection.length > 0) {
                console.log("หนังสือในห้องสมุดหลังจากโหลด:");
                this.displayBooks();
            } else {
                console.log("ไม่พบหนังสือในข้อมูลที่โหลดมา.");
            }
        } else {
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
