import fs from 'fs'

export interface SaveFileUseCase {
    execute: ( fileOptions: Options ) => boolean
}

type Options = {
    fileContent : string
    destination : string
    fileName    : string
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        /* 

        */
    ){
        


    }

    execute( options:Options ){
        
        try
        {

            const { fileName , fileContent , destination } = options
        
            const outputPath = destination
            
            const finalPath = `${outputPath}/${fileName}.txt`
            
            fs.mkdirSync( outputPath, { recursive: true })
            
            fs.writeFileSync(finalPath,fileContent)

            console.log('File created');

            return true

        }
        catch(err)
        {
            // console.log('Error')
            // console.log(err)
            return false
        }

    }

}