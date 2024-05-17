export enum LogSeverityLevel {
    low = 'LOW',
    medium = 'MEDIUM',
    high="HIGH"
}

export type LogEntityOptions = {
    level: LogSeverityLevel   
    createdAt?: Date
    message: string
    origin?: string
}

export class LogEntity {
    
    public createdAt: Date
    public message: string
    public origin: string
    public level: string

    constructor( options:LogEntityOptions ){
        
        const {
            level,
            message,
            origin = 'log.entity.ts',
            createdAt = new Date()
        } = options
        
        this.message = message;
        this.level = level;
        this.origin = origin
        this.createdAt = createdAt
        
    }

    static fromJSON(json:string) : LogEntity {
        
        const converted = JSON.parse(json)
        
        const log = new LogEntity({
            message:converted.message, 
            origin: converted.origin,
            level: converted.level
        })

        return log

    }

    static fromObject( object: { [key:string]: any } ) : LogEntity {

        const log = new LogEntity({
            level: object.level,
            message: object.message,
            origin: object.origin,
            createdAt: object.createdAt,
        })

        return log

    }
    
}