import express,{Express} from "express"
import morgan from "morgan"

import scraperRouter from "./routes/scraper.routes"


class Server  {
    app: Express
    port: string

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.app.use(morgan("dev"))
        this.app.use(express.json())

        this.routes()

    }

    routes(){
        this.app.use(scraperRouter)
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log(`The server is running in port: ${this.port}`);
        })
    }


}

export default Server