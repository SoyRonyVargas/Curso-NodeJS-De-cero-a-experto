import { LogEntity, LogSeverityLevel } from "../entity/log.entity";

export abstract class LogRepository {
    abstract getLogs(severityLevel:LogSeverityLevel): Promise<LogEntity[]>
    abstract saveLog(log:LogEntity): Promise<void>
}