import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { FileSystemDataSource } from "../infraestructure/datasources/fileSystem.datasource";
import { PostgresLogDataSource } from "../infraestructure/datasources/postgres.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { TaskService } from "./cron/task.service";
import { CheckMultipleService } from "../domain/use-cases/checks/checkMultiple.service";

// import { LogSeverityLevel } from "../domain/entity/log.entity";

// const fileSystemDataSource = new FileSystemDataSource();

const logPosgresRepository = new LogRepositoryImplementation(
    new PostgresLogDataSource()
    // new FileSystemDataSource()
    // new MongoLogDataSource()
);

const logFileSystemRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
    // new FileSystemDataSource()
    // new MongoLogDataSource()
);

const logMongoRepository = new LogRepositoryImplementation(
    new MongoLogDataSource()
    // new FileSystemDataSource()
    // new MongoLogDataSource()
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
        
        TaskService.createTask(
            '*/5 * * * * *',
            () => {
                const url = 'http://localhost:3000/posts'
                new CheckMultipleService(
                    [
                        logFileSystemRepository,
                        logPosgresRepository,
                        logMongoRepository
                    ],
                    () => console.log(`${ url } it's ok`),
                    (err) => console.log(`Error: ${err}`),
                ).execute(url)
            }
        )
        
        // TaskService.createTask(
        //     '*/2 * * * * *',
        //     () => {
        //         const f = new Date()
        //         console.log('Se ejecuto en 2 segundos' , f.toString());
        //     }
        // )

    }
}