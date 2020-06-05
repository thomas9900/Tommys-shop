import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            // const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${this.query}&apiKey=${key}`);
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);


            console.log(res)

            // this.result = res.data.results;
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}

// const res = await axios(`${proxy}https://api.spoonacular.com/food/products/search?query=${this.query}&apiKey=${key}`);


