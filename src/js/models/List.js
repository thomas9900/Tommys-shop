// import uniqid from 'uniqid';
import * as listView from '../views/listView';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(id, count, price, product) {
        const item = {
            id,
            count,
            price,
            product
        }
        this.items.push(item);
        this.persistData();
        console.log(this.items);
        
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        
        // [2, 4, 8] splice(1, 2) --> returns [4, 8]  original array is [2]
        // [2, 4, 8] slice(1, 2) --> returns 4, original array is [2, 4, 8]
        this.items.splice(index, 1);
        console.log(this.items) 
        this.persistData();
    }

    deleteList() {
        this.items = [];
        this.totalPrice = '';
        // listView.deleteListBtn();
        this.persistData();
    }

    updateCount(id, newCount) { 
        this.items.find(el => 1 + el.id === id).count = newCount;
        this.persistData();
    }


    persistData() {
        localStorage.setItem('items', JSON.stringify(this.items));
        localStorage.setItem('total', JSON.stringify(this.totalPrice));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('items'));
        // JSON.parse(localStorage.getItem('total'));

        // restoring likes from the localStorage
        if (storage) this.items = storage;
    }

    calcTotalPrice(count) {
        let totalPrice = 0;

        for (let i = 0; i < this.items.length; i++) {
            totalPrice += this.items[i].price;
            totalPrice = Math.round(totalPrice * 100) / 100;
        }
            
        this.totalPrice = totalPrice;

        let updatedPrice = document.querySelector('.total-price');
        updatedPrice.textContent = `Total: $${this.totalPrice}`;
        
        this.persistData();
    }

}

