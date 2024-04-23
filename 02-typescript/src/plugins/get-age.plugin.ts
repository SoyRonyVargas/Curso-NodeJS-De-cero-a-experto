// import getAgeLib from 'get-age'

const getAge = (birthdate:string) => {

    console.log('desde adaptador');

    if( !birthdate ){
        
        return null

    }

    return new Date().getFullYear() - new Date(birthdate).getFullYear()

}

module.exports = {
    getAge
}