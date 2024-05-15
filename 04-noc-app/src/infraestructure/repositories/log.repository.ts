import { LogSeverityLevel, LogEntity } from "../../domain/entity/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository {
    // private logDataSource : LogDataSource
    constructor(
        private readonly logDataSource:LogDataSource
    ){
        
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs( severityLevel );
    }
    
    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log);
    }

}