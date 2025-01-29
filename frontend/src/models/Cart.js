import Book from "./Book";

class Cart {
    constructor(user_id, cart = []) {
        this.user_id = user_id;
        this.cart = cart.map(book => new Book(book));
    }

    // Sum total price in cart
    getTotalPrice() {
        return this.cart.reduce((total, book) => total + book.stock * book.price, 0).toFixed(2);
    }

    static fromJSON(data) {
        if (!data || !Array.isArray(data.cart)) {
            console.error("Invalid data format for Cart:", data);
            return new Cart(data?.user_id || 0, []);
        }

        return new Cart(data.user_id, Book.fromJSON(data.cart));
    }
}

export default Cart;
