import { ServerApp } from "./presentation/server.app";
// import { handleCreateTable } from "./app.logic";
import { argv } from "./plugins/argv.plugin";


( async () => {

    await main()

})()

async function main() {
    
    // handleCreateTable()

    ServerApp.run({
        base: argv.b,
        limit: argv.l,
        show: argv.s,
        destination: argv.d,
        name: argv.n
    })

}