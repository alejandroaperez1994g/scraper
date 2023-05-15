import express, {Express} from "express"
import morgan from "morgan"

import porscheRoutes from "../routes/models.routes"
import dbConnection from "../db/config";
import {seedDataInMongoDB} from "../utils/scraper.utils";


class Server {
    app: Express
    port: string

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.connectDB()
        this.middlewares()
        this.routes()
        //this.seedDB() //only for seeding the data in MongoDB

    }

    routes() {
        this.app.use("/models", porscheRoutes)
    }

    async connectDB() {
        await dbConnection()
    }

    async seedDB() {
        await seedDataInMongoDB()
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
