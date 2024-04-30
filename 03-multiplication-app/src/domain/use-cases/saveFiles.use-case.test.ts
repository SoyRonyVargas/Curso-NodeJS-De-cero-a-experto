import fs , { existsSync ,rmSync } from "fs"
import { SaveFile } from "./saveFiles.use-case"

describe('saveFiles', () => { 

    // beforeEach( () => {

    //     rmSync('./src/domain/use-cases/output', { recursive: true })

    // })
    
    // despues de cada prueba
    afterEach( () => {

        try {
            rmSync('./src/domain/use-cases/output', { recursive: true })
            
        } catch (error) {
            
        }
    })

    test('Deberia guardar el archivo con valores por defecto', () => {

        const saveFile = new SaveFile()

        const result = saveFile.execute({
            fileContent: 'Hello',
            destination: './src/domain/use-cases/output',
            fileName: 'out'
        })

        expect(result).toBeTruthy()
        
        const exist = existsSync('./src/domain/use-cases/output/out.txt')
        
        expect(exist).toBeTruthy()

    })

    test('Deberia regresar falso', () => {

        const saveFile = new SaveFile()

        const mockSpy = jest.spyOn( fs , 'mkdirSync' ).mockImplementation( () => {
            throw new Error('Error custom')
        })

        const result = saveFile.execute({
            fileContent: 'Hello',
            destination: './src/domain/use-cases/output',
            fileName: 'out'
        })

        expect(result).toBeFalsy()

        mockSpy.mockRestore()


    })

})