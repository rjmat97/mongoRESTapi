import axios from 'axios'
import _ from 'lodash';

// const baseURI = 'http://192.168.14.180:5000/';
const baseURI = 'http://localhost:5000/';

const vloads = `${baseURI}viralLoad`;
const locs   = `${baseURI}locs`;
const cities = `${baseURI}cities`;

function removeids(str){ return str.map( d => _.omit(d, ['_id']))}

class PostService {
    static async getViralLoads(params=""){
        let url = vloads;
        if(params.length!=0) url = `${url}/?${params}`;
        return new Promise((resolve, reject) => 
            axios.get(url)
                .then( response => resolve(removeids(response.data)))
                .catch( error => reject(error)));
    }
    static async getLocs(params=""){
        let url = locs;
        if(params.length!=0) url = `${url}/?${params}`;
        return new Promise((resolve, reject) => 
            axios.get(url)
                .then( response => resolve(removeids(response.data)))
                .catch( error => reject(error)));
    }
    static async getCities(params=""){
        let url = cities;
        if(params.length!=0) url = `${url}/?${params}`;
        return new Promise((resolve, reject) => 
            axios.get(url)
                .then( response => resolve(removeids(response.data)))
                .catch( error => reject(error)));
    }
}

export default PostService;