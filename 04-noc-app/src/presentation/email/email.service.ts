import { envs } from '../../config/plugins/env.plugin'
import { createTransport } from 'nodemailer'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entity/log.entity'

type SendMailOptions = {
    attachment?: ATTACHMENT[]
    to: string | string[]
    htmlBody: string
    subject: string
}

type ATTACHMENT = {
    filename:string
    path: string
}

export class EmailService {

    private transporter = createTransport({
        service: envs.MAILER_MAIL,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
        private readonly logRepository: LogRepository
    ){

    }

    async sendEmail( options:SendMailOptions ): Promise<boolean> {

        try 
        {
            
            await this.transporter.sendMail({
                attachments: options.attachment ?? [],
                subject: options.subject,
                html: options.htmlBody,
                to: options.to,
            })

            // console.log(isSend);

            this.logRepository.saveLog(new LogEntity({
                level: LogSeverityLevel.medium,
                message: `Email send to: ${options.to}`,
                origin: __filename
            }))
            
            return true

        } 
        catch (error) 
        {
            
            console.log(`Email wasn't send: ${options.to}`);
            console.log(error);

            this.logRepository.saveLog(new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email wasn't send: ${options.to}`,
                origin: __filename
            }))
            
            return false

        }

    }
    
    async sendEmailWithLogs( to: string | string[] ): Promise<boolean> {

        try 
        {
            
            const subject = 'Logs del servidor'
            const html = `
                <h2>Logs del sistema</h2>
                <p>Miralos todos weon</p>
            `
            
            const attachments:ATTACHMENT[] = [
                {
                    filename: 'logs-low.log',
                    path: 'logs/logs-low.log'
                },
                {
                    filename: 'logs-medium.log',
                    path: 'logs/logs-medium.log'
                },
                {
                    filename: 'logs-high.log',
                    path: 'logs/logs-high.log'
                },
            ]

            return await this.sendEmail({
                attachment: attachments,
                htmlBody: html,
                subject,
                to: to
            })

        } 
        catch (error) 
        {
            
            console.log('error');
            
            console.log(error);
            
            return false

        }

    }

}