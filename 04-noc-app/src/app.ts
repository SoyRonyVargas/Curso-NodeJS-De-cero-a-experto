// import { LogModel } from "./data/mongo/models/log.model"
import { PrismaClient, SeveriityLevel } from "@prisma/client"
import { envs } from "./config/plugins/env.plugin"
import { MongoDatabase } from "./data/mongo/init"
// import { LogSeverityLevel } from "./domain/entity/log.entity"
import { Server } from "./presentation/server"

( async ()=> {

   await main()

})()

async function main(){

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    const prisma = new PrismaClient()
    
    await prisma.logModel.create({
        data: {
            message: 'Mensaje desde prima',
            level: SeveriityLevel.LOW,
            origin: __filename,
        }
    })
    
    const logs = await prisma.logModel.findMany({
        where: {
            level: SeveriityLevel.LOW
        }
    })

    console.log(logs);

    // const newLog = await LogModel.create({
    //     message: 'Mensaje desde app.ts',
    //     level: LogSeverityLevel.low,
    //     origin: __filename
    // })

    // await newLog.save()

    // const newLog = await LogModel.find({})

    // console.log(newLog);

    Server.start()
    
}

