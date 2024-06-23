export class RegisterUserDTO {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): [ string? , RegisterUserDTO? ] {
       
        const { name, email, password } = object;

        if (!name) return ['Missing name']
        
        if (!email) return ['Missing email']
        
        if (!password) return ['Missing password']

        const instance = new RegisterUserDTO(name, email, password);

        return [ , instance ]

    }
}
