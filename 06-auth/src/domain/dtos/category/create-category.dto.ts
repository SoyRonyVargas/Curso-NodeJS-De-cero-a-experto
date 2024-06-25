export class CreateCategoryDTO {

    private constructor(
        public readonly name: string,
        public readonly available: boolean
    ) {}

    static create( object: { [key: string]: any }): [ string? , CreateCategoryDTO? ] {
       
        let { name, available } = object;

        if (!name) return ['Missing name']
        
        if ( available === undefined ) return ['Missing available']

        console.log('available');
        console.log(available);

        available = (available === 'true' || available === true)

        const instance = new CreateCategoryDTO(name, available);

        return [ , instance ]

    }
}