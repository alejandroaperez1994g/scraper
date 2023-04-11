import express, {Express} from "express"
import morgan from "morgan"

import scraperRouter from "../routes/scraper.routes"
import dbConnection from "../db/config";


class Server {
    app: Express
    port: string

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.connectDB()
        this.middlewares()
        this.routes()

    }

    routes() {
        this.app.use("/models", scraperRouter)
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(morgan("dev"))
        this.app.use(express.json())
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`The server is running in port: ${this.port}`);
        })
    }


}

export default Server
