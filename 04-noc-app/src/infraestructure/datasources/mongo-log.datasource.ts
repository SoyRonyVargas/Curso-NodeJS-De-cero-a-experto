import { LogSeverityLevel, LogEntity } from "../../domain/entity/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogModel } from "../../data/mongo/models/log.model";

export class MongoLogDataSource implements LogDataSource {
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        })

        return logs.map( mongoLog => LogEntity.fromObject(mongoLog) )

    }
    
    async saveLog(log: LogEntity): Promise<void> {
        
        const newLog = await LogModel.create(log)

        await newLog.save()

        console.log( 'Mongo log created: ' + newLog.id );

    }

}