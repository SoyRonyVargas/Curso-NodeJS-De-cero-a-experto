import { LogEntity, LogSeverityLevel } from "../../entity/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckMultipleServiceUseCase {
    execute(url:string):Promise<Boolean>
}

type SuccessCallback = () => void

type ErrorCallback = (error:string) => void

export class CheckMultipleService implements CheckMultipleServiceUseCase {

    constructor(
        private readonly logsRepository : LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){

    }

    private async executeLogs(log:LogEntity){

        for( let logRepository of this.logsRepository ){
            await logRepository.saveLog(log)
        }

    }

    async execute( url: string ) : Promise<boolean> {

        try {
            
            const req = await global.fetch(url)
            
            if( !req.ok ) throw `Error al hacer fetch`;
                        
            const log = new LogEntity({
                level:LogSeverityLevel.low ,
                message: `Service: ${url} working`,
                origin: __filename
            })
            
            this.executeLogs(log)
            
            this.successCallback();

            return true

        } catch (error) {
            
            this.errorCallback(`${error}`);
            
            const log = new LogEntity({
                message: `Error: ${error}`, 
                level: LogSeverityLevel.high,
                origin: __filename
            })
            
            this.executeLogs(log)
            
            return false

        }

    }

}