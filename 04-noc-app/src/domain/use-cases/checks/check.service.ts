interface CheckServiceUseCase {
    execute(url:string):Promise<Boolean>
}

type SuccessCallback = () => void

type ErrorCallback = (error:string) => void

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){

    }

    async execute( url: string ) : Promise<boolean> {

        try {
            
            const req = await fetch(url)
            
            if( !req.ok ) throw `Error al hacer fetch`;

            this.successCallback();

            return true

        } catch (error) {
            this.errorCallback(`${error}`);
            console.error(`Error al hacer fetch: ${error}`);
            return false
            
        }

    }

}