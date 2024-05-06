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
    
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    saveLog(log: LogEntity): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
} 