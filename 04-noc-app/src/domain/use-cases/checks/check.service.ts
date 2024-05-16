import { LogEntity, LogSeverityLevel } from "../../entity/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url:string):Promise<Boolean>
}

type SuccessCallback = () => void

type ErrorCallback = (error:string) => void

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository : LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){

    }

    async execute( url: string ) : Promise<boolean> {

        try {
            
            const req = await global.fetch(url)
            
            if( !req.ok ) throw `Error al hacer fetch`;
                        
            const log = new LogEntity( `Service: ${url} working`, LogSeverityLevel.low )
            
            this.logRepository.saveLog(log)
            
            this.successCallback();

            return true

        } catch (error) {
            
            this.errorCallback(`${error}`);
            
            const log = new LogEntity( `Error: ${error}`, LogSeverityLevel.high )
            
            this.logRepository.saveLog(log)
            
            return false

        }

    }

}