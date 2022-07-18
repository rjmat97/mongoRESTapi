const middleWare = require('./middleWare/middleWare.js')
// import  middleWare from './middleWare/middleWare.js'

middleWare.getViralLoads('city=H').then( d => console.log(d))
