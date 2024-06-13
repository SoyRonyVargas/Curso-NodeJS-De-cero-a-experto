import express, { Router } from 'express'

interface Options {
    routes: Router
    PORT: number
}

export class Server {

    public app = express()

    async start( options: Options ){
        
        const { PORT , routes } = options
        
        // middlewares
        
        // PARA LOS JSON
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        // PARA LA CARPETA PUBLICA
        this.app.use( express.static('public') )

        this.app.use(routes)

        this.app.listen( PORT , () => {
            
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);

        })

        // return this.app

    }

}