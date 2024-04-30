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
            message += str
            if( i < limit ) message += '\n';
        }

        return message

    }

}