import { CreateTable } from "../domain/use-cases/createTable.use-case"
import { SaveFile } from "../domain/use-cases/saveFiles.use-case"
import { RunOptions, ServerApp } from "./server.app"

describe('Test al app server', () => {  

    test('Deberia correr el app bien', () => {

        const logSpy = jest.spyOn(console , 'log')
        const createTableSpy = jest.spyOn( CreateTable.prototype , 'execute' )
        const saveFileSpy = jest.spyOn( SaveFile.prototype , 'execute' )

        const options: RunOptions = {
            base: 5,
            destination: './src/presentation',
            limit: 10,
            name: '5',
            show: true
        }

        ServerApp.run(options)

        expect(logSpy).toHaveBeenCalledTimes(3)
        expect(logSpy).toHaveBeenCalledWith('File created')
        
        expect(createTableSpy).toHaveBeenCalledTimes(1)
        
        expect(createTableSpy).toHaveBeenCalledWith( options.base , options.limit )
        
        expect(saveFileSpy).toHaveBeenCalledTimes(1)
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileName: '5',
            destination: options.destination,
        })

        logSpy.mockRestore()
        
    })
    
    test('Deberia tener 2 llamadas', () => {
        
        const logSpy = jest.spyOn(console , 'log')
        
        const options: RunOptions = {
            base: 5,
            destination: './src/presentation',
            limit: 10,
            name: '5',
            show: false
        }
        
        ServerApp.run(options)
        
        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpy).toHaveBeenCalledWith('File created')
        logSpy.mockRestore()
        
    })

})