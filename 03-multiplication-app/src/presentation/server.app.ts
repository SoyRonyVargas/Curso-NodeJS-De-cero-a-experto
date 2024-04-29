import { CreateTable } from "../domain/use-cases/createTable.use-case";
import { SaveFile } from "../domain/use-cases/saveFiles.use-case";

interface RunOptions {
    destination: string
    show: boolean
    limit: number
    name: string
    base: number
}

export class ServerApp {

    static run( options:RunOptions ){

        const { base , limit, show, destination, name } = options

        const table = new CreateTable()
        
        const tableContent = table.execute(base, limit)

        if( show ) console.log(tableContent);

        console.log(options);

        new SaveFile().execute({
            fileContent: tableContent,
            fileName: name,
            destination,
        })

    }

}