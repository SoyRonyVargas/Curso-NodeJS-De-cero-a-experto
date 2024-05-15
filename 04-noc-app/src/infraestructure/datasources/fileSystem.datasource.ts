import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entity/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsLowPath = 'logs/logs-low.log'
    private readonly allLogsMediumPath = 'logs/logs-medium.log'
    private readonly allLogsHighPath = 'logs/logs-high.log'

    constructor(){
        this.createLogFiles()
    }

    private createLogFiles(){

        if( !fs.existsSync(this.logPath) )
        {
            fs.mkdirSync(this.logPath)    
        }

        if( fs.existsSync(this.allLogsLowPath ) ) return 

        fs.mkdirSync(this.allLogsLowPath)
        fs.mkdirSync(this.allLogsMediumPath)
        fs.mkdirSync(this.allLogsHighPath)

    }
    
    private getLogsFromFile(file:string): LogEntity[] {

        const logsContent = fs.readFileSync(file, 'utf-8')

        const contentArray = logsContent.split('},')

        const logs = contentArray.map( linea => LogEntity.fromJSON(linea) )
        
        return logs

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
        switch( severityLevel )
        {
            
            case LogSeverityLevel.low:
            return this.getLogsFromFile(this.allLogsLowPath)
            
            case LogSeverityLevel.medium:
            return this.getLogsFromFile(this.allLogsMediumPath)

            case LogSeverityLevel.high:
            return this.getLogsFromFile(this.allLogsHighPath)
            
            default:
            return []

        }

    }

    async saveLog(newLog: LogEntity): Promise<void> {
        
        const logJSON = `${JSON.stringify(newLog)}`

        fs.appendFileSync(
            this.logPath , 
            logJSON
        )

        if( newLog.level === LogSeverityLevel.low ) return
        
        if( newLog.level === LogSeverityLevel.medium ) 
        {
            fs.appendFileSync(
                this.allLogsMediumPath, 
                logJSON
            ) 
            
            return
            
        }
        
        if( newLog.level === LogSeverityLevel.high ) 
        {
            fs.appendFileSync(
                this.allLogsHighPath, 
                logJSON
            ) 
            
            return

        }
        
    }
} 