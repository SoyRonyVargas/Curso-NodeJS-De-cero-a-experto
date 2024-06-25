export class CreateCategoryDTO {

    private constructor(
        public readonly name: string,
        public readonly available: boolean
    ) {}

    static create( object: { [key: string]: any }): [ string? , CreateCategoryDTO? ] {
       
        let { name, available } = object;

        if (!name) return ['Missing name']
        
        if (!available) return ['Missing available']

        if( typeof available !== 'boolean' && available === 'true') 
        {
            available = true
        }
        else
        {
            available = false
        }

        const instance = new CreateCategoryDTO(name, available);

        return [ , instance ]

    }
}