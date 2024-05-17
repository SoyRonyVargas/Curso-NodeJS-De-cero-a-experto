import { FileSystemDataSource } from "../infraestructure/datasources/fileSystem.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { TaskService } from "./cron/task.service";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entity/log.entity";

// const fileSystemDataSource = new FileSystemDataSource();

const logRepository = new LogRepositoryImplementation(
    // new FileSystemDataSource()
    new MongoLogDataSource()
);

export class Server {

    static async start(){
        
        console.log("Server initialazed");

        // new EmailService()
        // .sendEmail({
        //     htmlBody: '<h1>Hola</h1>',
        //     subject: 'Hola sexo',
        //     to: 'elfantasmax2146@gmail.com'
        // })
        // new EmailService(fileSystemLogRepository)
        // .sendEmailWithLogs([
        //     'elfantasmax2146@gmail.com'
        // ])
        
        // const logs = await logRepository.getLogs(LogSeverityLevel.low)

        // console.log(logs);

        // TaskService.createTask(
        //     '*/5 * * * * *',
        //     () => {
        //         // new CheckService().execute('https://www.facebook.com')
        //         const url = 'http://localhost:3000/posts'
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${ url } it's ok`),
        //             (err) => console.log(`Error: ${err}`),
        //         ).execute(url)
        //     }
        // )
        
        // TaskService.createTask(
        //     '*/2 * * * * *',
        //     () => {
        //         const f = new Date()
        //         console.log('Se ejecuto en 2 segundos' , f.toString());
        //     }
        // )

    }
}