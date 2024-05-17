import { LogModel } from "./data/mongo/models/log.model"
import { envs } from "./config/plugins/env.plugin"
import { MongoDatabase } from "./data/mongo/init"
// import { LogSeverityLevel } from "./domain/entity/log.entity"
// import { Server } from "./presentation/server"

( async ()=> {

   await main()

})()

async function main(){

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    // const newLog = await LogModel.create({
    //     message: 'Mensaje desde app.ts',
    //     level: LogSeverityLevel.low,
    //     origin: __filename
    // })

    // await newLog.save()

    // const newLog = await LogModel.find({})

    // console.log(newLog);

    // Server.start()
    
}

