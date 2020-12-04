import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};


const createIngredient = ingredient => `
    <li class="recipe__item" data-itemid=>
        <svg class="recipe__icon">
        </svg>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.attrName}:</span>
            ${ingredient.attrValue}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        </figure>
        <div> 
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </div>
        <div class="recipe__details">
            
            <div class="recipe__info">
                <span class="recipe__info-text">Rating: <b>${recipe.rating}/5.0</b></span>
            </div>
            <div class="recipe__info">
                <span class="recipe__info-text">Price: <b>${recipe.price}</b></span>
            </div>
            <div class="recipe__info">
                <span class="recipe__info-text">Shipping: <b>Free</b></span>
            </div>
            <div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
                
                
            </ul>
            <span>Quantity</span>
            <div class="quantity-div">
                <div class="value-button btn-decrease" id="decrease" value="Decrease Value">-</div>
                <input class="quantity__input" type="number" id="number" value="1" />
                <div class="value-button btn-increase" id="increase" value="Increase Value">+</div>
            </div>
            

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">More information</h2>
            <p class="recipe__directions-text">
                This product was carefully designed and tested by
                <span class="recipe__by">${recipe.url}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
    // console.log(recipe.ingredients)
};


export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    console.log(item)
    item.parentElement.removeChild(item);
};

// export const increaseQuantity = quantity => {
//     let value = parseInt(document.getElementById('number').value, 10);
//     value = isNaN(value) ? 0 : value;
//     value++;
//     document.getElementById('number').value = value;
//     console.log(value);
//     quantity = value;
//     console.log(quantity);

// };

// export const decreaseQuantity = quantity => {
//     let value = parseInt(document.getElementById('number').value, 10);
//     value = isNaN(value) ? 0 : value;
//     value < 1 ? value = 1 : '';
//     value--;
//     document.getElementById('number').value = value;
//     console.log(value);
//     quantity = value;
// };




