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

        const existeLogDir = fs.existsSync(this.logPath)
        
        if( !existeLogDir  )
        {
            fs.mkdirSync(this.logPath)    
        }

        const existeAllLogsPath = fs.existsSync(this.allLogsLowPath )
        
        if( !existeAllLogsPath ){
            fs.writeFileSync(this.allLogsLowPath, '')
        }
        
        const existeAllLogsMediumPath = fs.existsSync(this.allLogsMediumPath)
        
        if( !existeAllLogsMediumPath ){
            fs.writeFileSync(this.allLogsMediumPath, '')
        } 
        
        const existeAllLogsHighPath = fs.existsSync(this.allLogsHighPath)
        
        if( !existeAllLogsHighPath ){
            fs.writeFileSync(this.allLogsHighPath, '')
        }

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
        
        const logJSON = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(
            this.allLogsLowPath , 
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