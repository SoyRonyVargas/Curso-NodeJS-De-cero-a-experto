
export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null,
    ){
        
    }

    get isCompleted(){
        return !!this.completedAt
    }

    static fromObject( object: { [key: string]: any } ){

        const { id , text, completedAt } = object

        if( !id ) throw 'Id is required'
        
        if( !text ) throw 'Text is required'
        
        if( !completedAt ) throw 'Text is required'

        return new TodoEntity( id , text , completedAt )

    }

}