import { getEnvs } from "./config/plugins/env.plugin"
import { Server } from "./presentation/server"

( async ()=> {

   await main()

})()

function main(){

    Server.start()
    
    const envs = getEnvs()    
    
    console.log(envs);

}

