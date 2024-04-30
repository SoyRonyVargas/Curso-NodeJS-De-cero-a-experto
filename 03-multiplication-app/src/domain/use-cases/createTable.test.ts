import { CreateTable } from "./createTable.use-case"

describe('CreateTable', () => { 

    test("Deberia crear tabla con valores por defecto", () => {

        const table = new CreateTable()

        expect(table).toBeInstanceOf(CreateTable)

        const tableContent = table.execute( 5 , 9 )
        const rows = tableContent.split('\n').length
        expect(tableContent).toContain('5 X 1 = 5')
        expect(tableContent).toContain('5 X 2 = 10')
        expect(rows).toBe(9)

    })
    
    test("Deberia crear tabla con valores 3 y 20", () => {

        const table = new CreateTable()

        expect(table).toBeInstanceOf(CreateTable)

        const tableContent = table.execute( 3 , 20 )
        
        const rows = tableContent.split('\n').length
        expect(tableContent).toContain('3 X 1 = 3')
        expect(tableContent).toContain('3 X 15 = 45')
        expect(tableContent).toContain('3 X 20 = 60')
        expect(rows).toBe(20)

    })

})