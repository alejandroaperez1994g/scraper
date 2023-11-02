import * as dotenv from 'dotenv';
import Configuration from "../interfaces/config.interface";

dotenv.config()

const ENV = process.env.NODE_ENV || 'development'

const CONFIG: Configuration = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },

    }
}


export default CONFIG[ENV]
