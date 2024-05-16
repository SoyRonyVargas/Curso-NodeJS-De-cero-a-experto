export enum LogSeverityLevel {
    low = 'LOW',
    medium = 'MEDIUM',
    high="HIGH"
}

export type LogEntityOptions = {
    level: LogSeverityLevel   
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
            origin = 'log.entity.ts'
        } = options
        
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
        this.origin = origin
        
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
}