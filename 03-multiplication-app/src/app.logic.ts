import { argv } from './plugins/argv.plugin'
import fs from 'fs'

export const handleCreateTable = () => {

    const { b , l , s } = argv
    
    let message = `
==================================
        Tabla del ${ b }
==================================
    `
    
    for( let i = 1 ; i <= l; i++){
        const str = `${b} X ${i} = ${ b * i }`    
        message += '\n'
        message += str
    }
    
    if( s )
    {
        console.log(message);
    }
    
    fs.mkdirSync(`./src/outputs`, { recursive: true })
    fs.writeFileSync(`./src/outputs/${b}.txt`,message)

    console.log('File created');
    

}