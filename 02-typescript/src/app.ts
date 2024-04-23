// const getPokemonById = require("./js-foundation/03-promises");
// const { buildLogger } = require("./public/logger.plugin");

import { buildLogger } from "./plugins/logger.plugin"

const logger = buildLogger('app.js')

// console.log('pokemon')
// getPokemonById(1)
// .then( d => console.log(d) )

logger.log('Hola mundo')
logger.error('Error de autenticacion')
// console.log(pokemon)