// 1. VARIABLES DE ENTORNO
// const { emailTemplate } = require('./js-foundation/01-template')
// console.log(emailTemplate);
// console.table(process.env);
// const { SHELL, npm_config_cache } = process.env
// debugger
// console.table({
//     SHELL,
//     npm_config_cache
// });

// 2. FACTORY FUNCTIONS
// const { buildMakePerson } = require('./js-foundation/02-factory-function');
// const { getAge } = require('./public/get-age.plugin');
// const { getUUID } = require('./public/get-id.plugin');

// const obj = {
//     nombre: 'Edison',
//     edad: 20,
//     fecha: '12/12/2000'
// }

// const fnCrear = buildMakePerson({
//     getAge,
//     getUUID
// })

// const persona1 = fnCrear(obj)

// console.log(fnCrear);

// console.log('persona1');
// console.log(persona1);

const getPokemonById = require("./js-foundation/03-promises");
const { buildLogger } = require("./public/logger.plugin");

const logger = buildLogger('app.js')

console.log('pokemon')
getPokemonById(1)
.then( d => console.log(d) )

logger.log('Hola mundo')
logger.error('Error de autenticacion')
// console.log(pokemon)