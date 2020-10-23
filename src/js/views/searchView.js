import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    console.log(resultsArr);
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
        console.log(el);

    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

// 'pasta with tomato and spinach'
/*
acc: 0 / acc + cur.length = 5 / newTitle = ['pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 25 / newTitle = ['pasta', 'with', 'tomato']
*/

export const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // console.log(acc, 'acc')
            // console.log(cur, 'cur')
            if (acc + cur.length <= limit) {
                
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        // console.log(newTitle)
        return `${newTitle.join(' ')} ...`;
    }
    
    // console.log(title)
    return title;
    
}

const renderProduct = product => {
    // const imgUrl = 'https://spoonacular.com/recipeImages/';
    const markup = `
    <li>
        <a class="results__link" href="#${product.productId}">
            <figure class="results__fig">
                <img src="${product.productElements.image.imgUrl}" alt="${product.productElements.title.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(product.productElements.title.title, 20)}</h4>
                <p class="results__author">${product.productElements.price.sell_price.formatedAmount}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1: page + 1}>
        <span>Page ${type === 'prev' ? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, ResPerPage) => {
    const pages = Math.ceil(numResults / ResPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // only btn to go to the next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both btns
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
     else if (page === pages && pages > 1) {
        // only btn to go to the prev page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (products, page = 1, ResPerPage = 4) => {
    // render results of current page
    const start = (page - 1) * ResPerPage;
    const end = page * ResPerPage;
    // recipes.forEach(el => renderRecipe(el));     is same
    products.slice(start, end).forEach(renderProduct);

    // render pagination btns
    renderButtons(page, products.length, ResPerPage);
};



