export enum LogSeverityLevel {
    low = 'LOW',
    medium = 'MEDIUM',
    high="HIGH"
}

export class LogEntity {
    
    public createdAt: Date
    public message: string
    public level: string

    constructor(
        message: string,
        level: LogSeverityLevel
    ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date()
    }

    static fromJSON(json:string) : LogEntity {
        
        const converted = JSON.parse(json)
        
        const log = new LogEntity( converted.message , converted.level )

        return log

    }
}