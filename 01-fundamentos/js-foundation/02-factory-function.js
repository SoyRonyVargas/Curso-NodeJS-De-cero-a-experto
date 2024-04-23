// UNA FUNCION QUE CREA UNA FUNCION
// const { getAge } = require('../public/get-age.plugin')
// const { getUUID } = require('../public/get-id.plugin')

// const obj = {
//     id: getUUID(),
//     nombre: 'Edison',
//     edad: 20,
//     fecha: '12/12/2000'
// }

const buildMakePerson = ({ getUUID , getAge }) => {

    return ({ nombre , fecha }) => {

        return {
            id: getUUID(),
            nombre,
            fecha,
            edad: getAge(fecha)
        }
    
    }

}

const buildPerson = ({ nombre , fecha }) => {

    return {
        id: getUUID(),
        nombre,
        fecha,
        edad: getAge(fecha)
    }

}

// const edison = buildPerson(
//     obj
// )

// console.log(edison);

module.exports = {
    buildMakePerson
}