import { FileSystemDataSource } from "../infraestructure/datasources/fileSystem.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { TaskService } from "./cron/task.service";


const fileSystemDataSource = new FileSystemDataSource();
const fileSystemRepository = new LogRepositoryImplementation(fileSystemDataSource);

export class Server {

    static start(){
        
        console.log("server start");
        
        TaskService.createTask(
            '*/5 * * * * *',
            () => {
                // new CheckService().execute('https://www.facebook.com')
                const url = 'http://localhost:3000'
                new CheckService(
                    fileSystemRepository,
                    () => console.log(`${ url } it ok`),
                    () => console.log('Error'),
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