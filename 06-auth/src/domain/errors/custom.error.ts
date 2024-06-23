
export class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly msg: string,
    ){
        super(msg)
    }

    static badRequest(msg:string) {
        return new CustomError(400, msg)
    }
    
    static unauthorized(msg:string) {
        return new CustomError(401, msg)
    }
    
    static forbidden(msg:string) {
        return new CustomError(403, msg)
    }
    
    static notFound(msg:string) {
        return new CustomError(404, msg)
    }
    
    static serverError(msg:string) {
        return new CustomError(500, msg)
    }

}