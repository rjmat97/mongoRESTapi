const _ = require('lodash')
const locCordsInfo = require('./locs.json')

function locAbbrs(file){
    let ret = file.map( d => _.pick(d, ['locName', 'abbr']))
    let key = ret.map( d => d.abbr)
    let val = ret.map( d => d.locName)
    return _.zipObject(key, val)
}

function locCords(file){
    let ret = file.map( d => _.pick(d, ['abbr', 'n','e']))
    let key = ret.map( d => d.abbr)
    let val = ret.map( d => [d.n, d.e])
    return _.zipObject(key, val)
}

out = locCords(locCordsInfo)
console.log(out)
