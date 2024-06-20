import mongoose from "mongoose"

interface ConnectionOptions {
    mongoUrl: string
    dbName: string
}

export class MongoDatabase {

    static async connect( options : ConnectionOptions ){

        try {
            
            const { dbName , mongoUrl } = options

            await mongoose.connect( mongoUrl , {
                dbName,
            })

            console.log('connected to MongoDB');

        } 
        catch (error) 
        {
            throw new Error('Error de conexion');
        }

    }

}