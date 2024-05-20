import { PrismaClient, SeveriityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entity/log.entity";

const prisma = new PrismaClient()

export class PostgresLogDataSource implements LogDataSource {
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await prisma.logModel.findMany({
            where: {
                level: severityLevel
            }
        })

        return logs.map( log => LogEntity.fromObject(log) )

    }
    
    async saveLog(log: LogEntity): Promise<void> {
        
        await prisma.logModel.create({
            data: {
                ...log,
                level: log.level as SeveriityLevel,
            }
        })

        return;

    }
}