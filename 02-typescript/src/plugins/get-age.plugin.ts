// import getAgeLib from 'get-age'

export const getAge = (birthdate:string) => {

    if( !birthdate ){
        return null
    }

    return (new Date().getFullYear() - new Date(birthdate).getFullYear())

}
