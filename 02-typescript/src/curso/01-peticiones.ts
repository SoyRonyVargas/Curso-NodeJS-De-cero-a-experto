import { httpClientPlugin } from "../plugins/get-fetch.plugin"

export const getPokemonNameById = async ( id:number ) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const data = await httpClientPlugin.get(url)
    
    return data.name
    
}

