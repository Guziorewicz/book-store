class Book {
    constructor({ id, title, author, pages, stock, price }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.stock = stock;
        this.price = price;
    }

    
    static fromJSON(dataArray) {
        if (!Array.isArray(dataArray)) {
            console.error("Expected an array but received:", dataArray);
            return [];
        }
        return dataArray.map(data => new Book(data));
    }

}

export default Book;
