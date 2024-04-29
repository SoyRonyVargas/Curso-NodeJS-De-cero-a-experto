import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

export const argv = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: true,
        describe: 'Show multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'Show multiplication file name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './src/outputs/',
        describe: 'Multiplication output file'
    })
    .check(( argv ) => {
        
        if( argv.b < 1 ) throw 'La base debe ser un numero positivo'
        
        return true

    })
    .parseSync()
