import { LogEntity, LogSeverityLevel } from "../entity/log.entity";

export abstract class LogDataSource {
    abstract getLogs(severityLevel:LogSeverityLevel): Promise<LogEntity[]>
    abstract saveLog(log:LogEntity): Promise<boolean>
}