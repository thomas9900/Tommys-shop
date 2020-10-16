import axios from 'axios';
import { key, proxy } from '../config';


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            // const options = {
            //   method: 'GET',
            //   url: 'https://rapidapi.p.rapidapi.com/products.json',
            //   params: {product_category: `${this.query}`, brand: 'colourpop'},
            //   headers: {
            //     'x-rapidapi-host': 'makeup.p.rapidapi.com',
            //     'x-rapidapi-key': 'a3aca44c0cmsh8d30faed9f743f1p1dbe80jsn5bfb90d3d337'
            //   }
            // };

            // let res = await axios(options);
            // console.log(res.data);

            // this.result = res.data;

            // for (let i = 0; i < res.data.length; i++) {
                
            //     let names = res.data[i].name;
            //     console.log(names);
            // }

            
            



            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);


            console.log(res)

            this.result = res.data.recipes;
            


            



        } catch (error) {
            alert(error);
        }
    }
}



