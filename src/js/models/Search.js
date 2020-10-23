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




            const options = {
              method: 'GET',
              url: 'https://rapidapi.p.rapidapi.com/search',
              params: {query: `${this.query}`, from: '0', limit: '12', country: 'CO'},
              headers: {
                'x-rapidapi-host': 'ali-express1.p.rapidapi.com',
                'x-rapidapi-key': 'a3aca44c0cmsh8d30faed9f743f1p1dbe80jsn5bfb90d3d337'
              }
            };

            let res = await axios(options);
            console.log(res.data);
            
            this.result = res.data;



            
            



            // const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);


            // console.log(res.data.recipes)

            // this.result = res.data.recipes;
            


            



        } catch (error) {
            alert(error);
        }
    }
}



