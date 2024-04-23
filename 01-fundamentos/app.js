// const fs = require('fs')

// const data = fs.readFile('data.txt' , (err, data) => {

//     console.log(data.toString());

// })

// console.log('fin');

console.log('Inicio');

setTimeout( () => {

    console.log('Primero');
    
}, 3000)

setTimeout( () => {

    console.log('Segundo');

}, 0)

setTimeout( () => {

    console.log('tercero');

}, 0)

console.log('Fin');