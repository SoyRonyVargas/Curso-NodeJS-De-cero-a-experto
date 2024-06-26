
export class PaginationDTO {

    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ) {}

    static create( page: number , limit: number ): [ string? , PaginationDTO? ] {

        if( isNaN(page) || isNaN(limit) ){
            return ['Page or limit must be a number']
        }

        if( page <= 0 ) return ['Page must be greater than 0']
        if( limit <= 0 ) return ['Limit must be greater than 0']

        const instance = new PaginationDTO(page , limit)

        return [ undefined , instance ]

    }
}