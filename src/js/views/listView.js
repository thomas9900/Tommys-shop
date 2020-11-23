import { elements } from './base';


export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid=${1 + item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" class="shopping__count-value" step="${item.count}">
            <p>$${item.price}</p>
        </div>
        <p class="shopping__description">${item.product}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
    // console.log(item)
};

export const deleteListBtn = () => {
    const deleteList = `
    <div class="shopping__item">
        <button class="shopping__delete-list btn-tiny " id="removeList">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </div>
    `;
    elements.shopping.insertAdjacentHTML('afterbegin', deleteList);    
};
 
export const totalPriceBtn = val => {
    const markup = `
    <div class="checkout">
        <h2 class="total-price" value="">Total: $${val.totalPrice} <h2>
        <br>
        <button class="btn-small">
            Proceed to checkout
        </button>
    </div>
    `;
    elements.shopping.insertAdjacentHTML('afterend', markup);    
};

export const deleteWholeList = () => {
    const item = document.querySelectorAll('.shopping__item');
    const checkout = document.querySelector('.checkout');
    for (let i = 0; i < item.length; i++) {
        item[i].remove();
    };
    checkout.remove();
};


export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    console.log(item)
    item.parentElement.removeChild(item);
};


