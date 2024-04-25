import { getPokemonNameById } from "../../src/curso/01-peticiones"

describe('test a 01 peticiones', () => { 

    test('Prueba 1', async () => {

        const id = 1

        const pokemonName = await getPokemonNameById(id)

        expect(pokemonName).toBe('bulbasaur')

    })

})