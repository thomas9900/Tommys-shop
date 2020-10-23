import axios from 'axios';
import uniqid from 'uniqid';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            // const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            // // console.log(res);
            // this.title = res.data.recipe.title;
            // this.author = res.data.recipe.publisher;
            // this.img = res.data.recipe.image_url;
            // this.url = res.data.recipe.sourceUrl;
            // this.ingredients = res.data.recipe.ingredients;
            // console.log(res.data.recipe);

            


            const options = {
              method: 'GET',
              url: `https://rapidapi.p.rapidapi.com/product/${this.id}`,
              params: {language: 'en'},
              headers: {
                'x-rapidapi-host': 'ali-express1.p.rapidapi.com',
                'x-rapidapi-key': 'a3aca44c0cmsh8d30faed9f743f1p1dbe80jsn5bfb90d3d337'
              }
            };
            let res = await axios(options);
            console.log(res);
            this.title = res.data.titleModule.subject;
            this.author = res.data.priceModule.minActivityAmount.formatedAmount;
            this.img = res.data.imageModule.imagePathList[0];
            this.url = res.data.storeModule.storeName;
            this.ingredients = res.data.imageModule.imagePathList;



            
        } catch (error) {
            console.log(error);
            alert('smth wrong');
        }   
    }

    calcTime() {
        // 15min for 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds', 'cans'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'can'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            let id = uniqid();
            
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) parse ingredients into count, unit and ingredients
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            // console.log(arrIng);
            // console.log(unitIndex);

            let objIng;
            if (unitIndex > -1) {
                // there is a unit
                // ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                    
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    id,
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                
            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit, but 1st element is number
                objIng = {
                    id,
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // there is no unit & no nr in 1st position
                objIng = {
                    id,
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            // console.log(objIng)            

            return objIng;

        });
        this.ingredients = newIngredients;
    }

    updateServings (type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // ingredients
        this.ingredients.forEach(ing => {
// console.log(ing, newServings, this.servings)
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}


