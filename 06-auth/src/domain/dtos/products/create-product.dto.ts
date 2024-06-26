import { Validators } from "../../../config/validators";

export class CreateProductDTO {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly user: string,
        public readonly category: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateProductDTO?] { 
        
        const { 
            name,
            available,
            price,
            user,
            category
        } = object;

        if (!name) return ['Missing name'];
        if (available === undefined) return ['Missing available'];
        if (!price) return ['Missing price'];
        if (!user) return ['Missing user'];
        if (!category) return ['Missing category'];

        if( !Validators.isMongoId(category) ) return ['Not category id valid'] 
        if( !Validators.isMongoId(user) ) return ['Not user id valid'] 

        return [undefined, new CreateProductDTO(name, !!available, price, user, category)];
    }
}
