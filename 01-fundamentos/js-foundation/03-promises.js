const httpClientPlugin = require("../public/get-fetch.plugin")

const getPokemonById = async ( id ) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const data = await httpClientPlugin.get(url)
    
    return data.name
    
}

module.exports = getPokemonById