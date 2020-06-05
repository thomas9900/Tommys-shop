import { elements } from './base';


export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid=${1 + item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" class="shopping__count-value" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
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

export const deleteWholeList = () => {
    const item = document.querySelectorAll('.shopping__item');
    for (let i = 0; i < item.length; i++) {
        item[i].remove();
    };
};


export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    console.log(item)
    item.parentElement.removeChild(item);
};


