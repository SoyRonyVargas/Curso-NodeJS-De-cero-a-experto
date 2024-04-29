export interface CreateTableUserCase {
    execute: ( base: number , limit: number ) => string
}

export class CreateTable implements CreateTableUserCase {

    constructor(
        /* 

        */
    ){
        


    }

    execute( base: number , limit: number ){
        
        let message = ''

        for( let i = 1 ; i <= limit; i++){
            const str = `${base} X ${i} = ${ base * i }`    
            message += '\n'
            message += str
        }

        return message

    }

}