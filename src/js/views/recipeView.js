import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if (count) {
        // count = 2.5 --> 5/2 --> 2 1/2
        // count = 0.5 --> 1/2
        const newCount = Math.round(count * 100) / 100;
        // console.log(newCount)
        let [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));
        // console.log(int, dec)


        if (!dec) return newCount;

        if (int === 0) {
            const fr = new Fraction(newCount);
            // console.log(fr)
            return `${fr.numerator}/${fr.denominator}`;
            
        } else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
        
    }
    
    return '?';
};

const createIngredient = ingredient => `
    <li class="recipe__item" data-itemid=${ingredient.id}>
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>

        <div class="recipe__info-buttons  add-ing-shoplist">
            <button class="btn-tiny" data-itemid=${ingredient.id}>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>
    </li>


`;

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <span class="recipe__info-text">Rating: ${recipe.rating}/5.0</span>
            </div>
            <div class="recipe__info">
                <span class="recipe__info-text">Brand: ${recipe.brand}</span>


            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <span>Price: ${recipe.price}</span>
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
                ${console.log(recipe.ingredients)}
                
            </ul>
            <span>Quantity</span>
            <div class="quantity-div">
                <div class="value-button decrease" id="decrease" value="Decrease Value">-</div>
                <input type="number" id="number" value="1" />
                <div class="value-button increase" id="increase" value="Increase Value">+</div>
            </div>
            

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.url}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
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

export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    // console.log(countElements)
    countElements.forEach((el, i) => {
        
        el.textContent = formatCount(recipe.ingredients[i].count);
        // console.log(el.textContent, i)
    })
};



export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    console.log(item)
    item.parentElement.removeChild(item);
};





