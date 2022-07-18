// import  PostService from './PostService.js'
import _ from 'lodash'
import axios from 'axios'

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

export default {
    async parseLoads(){
        let load = await PostService.getViralLoads('city=H')
        let locCordsInfo = await PostService.getLocs('city=H')
        
        let uniqueDates = _.uniq(_.map(load, d => d.collectDate), true)

        let uniqLocs = locCordsInfo.map( d => d.abbr)
        let locations  = {}
        uniqLocs.forEach( d => {
            let ob = load.filter( j =>  j.abbr == d)
            let keys = ob.map( l => l.collectDate.slice(0, 10))
            let vals = ob.map( l => l.vload)
            locations[d] = _.zipObject(keys, vals)
        }) 
        let dates = {
            start : uniqueDates[0].slice(0,10),
            end   : uniqueDates.slice(-1)[0].slice(0,10) 
        }
        return {
            locations, 
            locCordsInfo,
            dates
        }
    }
}