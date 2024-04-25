import { getAge } from "../../src/plugins/get-age.plugin"

describe('Test al age', () => { 

    test('Probando la funcion', () => {

        const edad = getAge('2000-12-28')

        expect(edad).toBe(24)

    })

})