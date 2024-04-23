const getAgeLib = require("get-age");

const getAge = (birthdate) => {

    console.log('desde adaptador');

    if( !birthdate ){
        
        return null

    }

    return getAgeLib(birthdate)

}

module.exports = {
    getAge
}