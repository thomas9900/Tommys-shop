import axios from 'axios';
import uniqid from 'uniqid';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
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
            this.rating = res.data.titleModule.feedbackRating.averageStar;
            this.img = res.data.imageModule.imagePathList[0];
            this.url = res.data.storeModule.storeName;
            this.ingredients = res.data.specsModule.props;
            // this.ingredients = ['hi', 'bye'];

            
            


            // for different price api
            if (res.data.priceModule.minActivityAmount) {
                this.price = res.data.priceModule.minActivityAmount.formatedAmount;
            } else this.price = res.data.priceModule.formatedPrice;

            this.priceValue = Number(this.price.replace('US $', ''));
            console.log(this.priceValue);
            
            // if rating is missing
            if (this.rating == '0.0') {this.rating = '-'};
            

            
        } catch (error) {
            console.log(error);
            alert('smth wrong');
        }   
    }

    getProperties() {
        for (let i = 0; i < res.data.specsModule.props.length; i++) {
            this.props = res.data.specsModule.props[i].attrName + ': ' + res.data.specsModule.props[i].attrValue;
            console.log(this.props);

        }
    }


    calcServings() {
        this.quantity = 1;
    }

    // parseIngredients() {
    //     const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoon', 'teaspoons', 'cups', 'pounds', 'cans'];
    //     const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'can'];
    //     const units = [...unitsShort, 'kg', 'g'];

    //     const newIngredients = this.ingredients.map(el => {
    //         // 1) Uniform units
    //         let ingredient = el.toLowerCase();
    //         let id = uniqid();
            
    //         unitsLong.forEach((unit, i) => {
    //             ingredient = ingredient.replace(unit, unitsShort[i]);
    //         });
            
    //         // 2) Remove parentheses
    //         ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

    //         // 3) parse ingredients into count, unit and ingredients
    //         const arrIng = ingredient.split(' ');
    //         const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

    //         // console.log(arrIng);
    //         // console.log(unitIndex);

    //         let objIng;
    //         if (unitIndex > -1) {
    //             // there is a unit
    //             // ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
    //             // ex. 4 cups, arrCount is [4]
    //             const arrCount = arrIng.slice(0, unitIndex);

    //             let count;
    //             if (arrCount.length === 1) {
    //                 count = eval(arrIng[0].replace('-', '+'));
                    
    //             } else {
    //                 count = eval(arrIng.slice(0, unitIndex).join('+'));
    //             }

    //             objIng = {
    //                 id,
    //                 count,
    //                 unit: arrIng[unitIndex],
    //                 ingredient: arrIng.slice(unitIndex + 1).join(' ')
    //             };
                
    //         } else if (parseInt(arrIng[0], 10)) {
    //             // there is no unit, but 1st element is number
    //             objIng = {
    //                 id,
    //                 count: parseInt(arrIng[0], 10),
    //                 unit: '',
    //                 ingredient: arrIng.slice(1).join(' ')
    //             }
    //         } else if (unitIndex === -1) {
    //             // there is no unit & no nr in 1st position
    //             objIng = {
    //                 id,
    //                 count: 1,
    //                 unit: '',
    //                 ingredient
    //             }
    //         }
    //         // console.log(objIng)            

    //         return objIng;

    //     });
    //     this.ingredients = newIngredients;
    // }

    updateServings (type) {
        // servings
        const fixedPrice = this.priceValue;
        const newServings = type === 'dec' ? this.priceValue - fixedPrice : this.priceValue + fixedPrice;

        // ingredients
        // this.ingredients.forEach(ing => {
        //     ing.count *= (newServings / this.servings);
        // });

        this.priceValue = newServings;
    }
}


