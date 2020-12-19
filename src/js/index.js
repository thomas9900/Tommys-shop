// import str from './models/Search';
// import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`using imp func ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(2, 5)}. ${str}`);


import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/*  
* global state of the app
* - search object
* - current recipe object
* - shopping list object
* - liked recipes
*/

const state = {};
console.log(state);

/*
* SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) new search object and add to state
        state.search = new Search(query);
        console.log(state.search);
        // 3) prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) search for recipes
            await state.search.getResults();

            // 5) render results on UI
            clearLoader();

            searchView.renderResults(state.search.result);

        } catch (err) {
            alert('something wrong with search');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();      
    controlSearch();
    
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        console.log(state.search.result);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*
* RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    //get ID from url
    const id = window.location.hash.replace('#', '');
    // console.log(window.location)
    if (id) {
        
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        // console.log(state.search)

        // highlight selected item
        if (state.search) searchView.highlightSelected(id);
    
        //create new recipe object
        state.recipe = new Recipe(id);
        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            // state.recipe.parseIngredients();

            //render recipe
            clearLoader();
            // console.log(state)
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

        } catch(err) {
            console.log(err);
            alert('error processing recipe');
        }
    }
};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/*
* LIST CONTROLLER
*/
const controlList = () => {
    // create a new list if there is none yet
    if (state.list.items.length === 0) {
        state.list = new List();
        listView.deleteListBtn();
        listView.totalPriceBtn(state.list);
    }

    // add each ingredient to the list and UI
    // state.recipe.ingredients.forEach(el => {
    //     const item = state.list.addItem(el.id, el.count, el.unit, el.ingredient);
    //     listView.renderItem(item);
    //     console.log(item) 
    // });
    const item = state.list.addItem(state.recipe.id, state.recipe.quantity, state.recipe.priceValue, searchView.limitTitle(state.recipe.title));

    state.list.calcTotalPrice();
    
    listView.renderItem(item);
    
};

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(e.target)

    // handle the delete 
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // console.log(state.list.items.length)

        // delete from UI
        listView.deleteItem(id);
        
        if (state.list.items.length === 0) {
            listView.deleteWholeList();
        }

    // delete the whole list
    } else if (e.target.matches('.shopping__delete-list, .shopping__delete-list *')) { 
        state.list.deleteList();
        listView.deleteWholeList();
        

    // handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        console.log(id)
        state.list.updateCount(id, val);
    }
});

/*
* LIKES CONTROLLER
*/

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    // console.log(state)
    const currentID = state.recipe.id;

    // user has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.price,
            state.recipe.img
        );

        // toggle the like button
        likesView.toggleLikeBtn(true);
        
        // add like to UI list
        likesView.renderLike(newLike);

    // user HAS liked current recipe
    } else {
        // remove like from the state
        state.likes.deleteLike(currentID);

        // toggle the like button
        likesView.toggleLikeBtn(false);

        // remove like from UI list
        likesView.deleteLike(currentID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// restore liked recipes and list on page load
window.onload = () => {
    state.likes = new Likes();
        
    state.list = new List();
        
    // console.log(state.list)

    // restore likes
    state.likes.readStorage();

    // restore list
    state.list.readStorage();
    
    // toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

    // render exising list
    state.list.items.forEach(item => listView.renderItem(item));
    if (state.list.items.length > 0) {
        listView.deleteListBtn();
        listView.totalPriceBtn(state.list);
        state.list.calcTotalPrice();
    }
};



// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.quantity > 1) {
            state.recipe.decreaseQuantity();
            state.recipe.updatePrice('dec');
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.increaseQuantity();
        state.recipe.updatePrice('inc');
        
        console.log(state.recipe.quantity)

    } else if (e.target.matches(`.recipe__btn--add, .recipe__btn--add *`)) {
        // add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // like controller
        controlLike();
    }
    
});


console.log(state)
