import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entity/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogUseCase {
    
    execute(to:string | string[]):Promise<boolean>
    
}

export class SendEmailLogs implements SendEmailLogUseCase {
    
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){

    }

    async execute(to: string | string[]): Promise<boolean> {
 
        try 
        {
            
            const isSend = this.emailService.sendEmailWithLogs(to)

            if( !isSend ) throw 'Error al enviar el correo de logs'

            return true

        } 
        catch (error) 
        {
            
            this.logRepository.saveLog(new LogEntity({
                message: 'Error al enviar el correo de logs',
                level: LogSeverityLevel.high,
                origin: __filename
            }))

            return false;
            
        }
        
    }
}